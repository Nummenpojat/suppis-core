import {getFirestore} from "firebase-admin/firestore";
import {getApps, initializeApp} from "firebase-admin/app";
import {credential} from "firebase-admin";

// Replace file path with your own firebase admin sdk secret key file
const ServiceAccount = require('../config/firebase-admin-secrets/suppis-firebase-admin-secrets.json');
const app = initializeApp({
  credential: credential.cert(ServiceAccount)
});

// exporting db to be used on other parts of application
export const db = getFirestore(app);
