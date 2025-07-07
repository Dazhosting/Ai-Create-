import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  (process.env.FIREBASE_ADMIN_KEY_JSON || "{}")
    .replace(/\\n/g, '\n') // ✅ ubah \\n jadi \n asli
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };
