const nodemailer = require('nodemailer');

const CustomerOrderConfirmation = async (user, order) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    // Correctly reference the orderItems array
    const itemsList = order.orderItems.map(item => `
        <li>
            <strong>Product:</strong> ${item.productName} <br />
            <strong>Quantity:</strong> ${item.quantity} <br />
            <strong>Amount:</strong> ${item.amount} PKR <br />
            <strong>Shipping-Cost:</strong> ${order.shippingCost} PKR

        </li>
    `).join('');

    const emailContent = `
        <h2>Order Successfully Placed</h2>
        <p>Dear ${user.name},</p>
        <p>Thank you for shopping with Aktiv-Fits. Your order has been successfully placed and will reach you in a few days. Below are your order details:</p>
        <ul>
            ${itemsList}
        </ul>
        <p><strong>Total Amount:</strong> ${order.totalAmountWithShipping} PKR</p>
        <p>If you have any questions or need further assistance, please contact us at +923485787834.</p>
        <p>Best regards,<br />Aktiv-Fits Team</p>`;

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Order Successfully Placed',
        html: emailContent
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
};

module.exports = CustomerOrderConfirmation;
