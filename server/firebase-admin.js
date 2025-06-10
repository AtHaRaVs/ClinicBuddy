const admin = require("firebase-admin");
const serviceAccount = require("../clinicbuddy-6377e-firebase-adminsdk-fbsvc-dbce0eaf55.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

module.exports = { admin };
