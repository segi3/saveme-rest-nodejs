var admin = require("firebase-admin");

var serviceAccount = require("@root/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://b21-cap0083-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = {
    admin,
    db: admin.firestore()
}