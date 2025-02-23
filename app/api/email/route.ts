import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: NextRequest) {
  const { subject, message, actor } = await req.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth:    {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD
    }
  });

  const emailForUsOptions: Mail.Options = {
    from:    process.env.NODEMAILER_EMAIL,
    to:      actor === process.env.DANIEL_EMAIL ? process.env.ROCIO_EMAIL : process.env.DANIEL_EMAIL,
    subject: subject,
    html:   message
  };

  const sendMailPromise = (mailOptions: Mail.Options) =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve(subject);
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise(emailForUsOptions);
    return NextResponse.json({
      success: true,
      message: subject
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "There was an error sending the email. Please try again later."
    }, {
      status: 500
    });
  }
}