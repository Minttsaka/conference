import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { newMessageTemplate } from "./emailTemplates/newMessage";

export async function  sendMail({
  from,
  subject,
  body,
}: {
  from: string;
  subject: string;
  body: string;
}) {

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "minttsaka@gmail.com",      // Your Gmail address
        pass: "unta ipmu yzlo ivkp"  // Your Gmail password or App Password
    }
});
  console.log(from)

  try {
    const testResult = await transport.verify();
    console.log("Test Result Of Transport", testResult);
  } catch (e) {
    console.log(e);
  }
  try {
    const sendResult = await transport.sendMail({
      from: `"${from}", <minttsaka@gmail.com>`,
      to:'minttsaka@gmail.com',
      subject,
      html: body,
      replyTo: from,
      
    });
    console.log({ sendResult });
    return sendResult;
  } catch (e) {
    console.log(e);
  }
}

export function compileMessageTemplate(name: string, message:string) {
  const template = Handlebars.compile(newMessageTemplate);
  const htmlBody = template({
    name,
    message,
    currentYear:new Date().getFullYear()
  });
  return htmlBody;
}



