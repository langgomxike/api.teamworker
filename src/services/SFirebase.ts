import admin from "firebase-admin";
import serviceAccount from "../../teamworker-account-service.json";
import { log } from "./SLog";

export default class SFirebase {
    private static databaseRef: admin.database.Database;

    static getDatabaseReference(): admin.database.Database {
        if (!this.databaseRef) {
            //init database
            this.databaseRef = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
                databaseURL: "https://youlesson-2666c-default-rtdb.asia-southeast1.firebasedatabase.app"
            })?.database();

            log(console.log, "Firebase Database", "Connected to firebase realtime database", this.databaseRef.app.name as unknown ?? {});
        }

        return this.databaseRef;
    }
}