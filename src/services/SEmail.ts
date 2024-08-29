import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { log } from "./SLog";

export default class SEmail {
    static validateEmail(email: string): boolean {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return (Boolean)(email && emailRegex.test(email));
    }

    static sendEmail(toEmail: string, subject: string, message: string, onSuccess = () => { }, onFailure = (err: any) => { }, onComplete = () => { }) {
        if (!this.validateEmail(toEmail)) {
            onFailure("Invalid email");
        }

        const user = dotenv.config().parsed?.ADMIN_EMAIL;
        const pass = dotenv.config().parsed?.ADMIN_APP_PASSWORD;

        log(console.info, "Email service", "check email admin data", {
            user: user,
            pass: pass ? "***" : "",
        });

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: user,
                pass: pass
            },
        });

        const mailOptions = {
            from: user,
            to: toEmail,
            subject: subject,
            text: message,
        };

        log(console.info, "Email options check", "show email options", mailOptions);

        transporter.sendMail(mailOptions)
            .then(onSuccess)
            .catch(onFailure)
            .finally(onComplete);
    }
}