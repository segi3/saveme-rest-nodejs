var admin = require("firebase-admin");

var serviceAccount = require("@root/serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.DATABASE_URL,
	storageBucket: process.env.BUCKET_URL
});

module.exports = {
	admin,
	db: admin.firestore(),
	bucket: admin.storage().bucket()
}