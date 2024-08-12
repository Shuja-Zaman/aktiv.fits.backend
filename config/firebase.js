const admin = require('firebase-admin');
const serviceAccount = require('./aktiv-fits-ccd65-firebase-adminsdk-1n1a1-6b21ef0d78.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "aktiv-fits-ccd65.appspot.com"
});

const bucket = admin.storage().bucket();

module.exports = { bucket };

