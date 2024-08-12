const User = require('../models/Customer');
const VerifyMail = require('../config/verify');
const {generateVerificationToken} = require('../config/generateToken');

// Email verification
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.verificationToken = undefined; // Clear the token
        user.verificationTokenExpires = undefined; // Clear the expiration
        user.isVerified = true; // Set user as verified

        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Resend verification email function
exports.resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        const verifyToken = generateVerificationToken();
        user.verificationToken = verifyToken;
        user.verificationTokenExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        await VerifyMail(user, verifyToken);

        res.status(200).json({ message: 'Verification email resent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check if user is verified
exports.isVerified = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(200).json({ message: 'User is verified' });
        } else {
            return res.status(400).json({ message: 'User is not verified' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};