import nodemailer from 'nodemailer';
export const sendEmail = async (
    {  to ,
        subject = "job submission for you",
        textMessage = "",
        htmlMessage = "",
        attachments = []} = {}
) => {

//configure email ( transporter)

 const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

//send email

const info =await transporter.sendMail({ 
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: textMessage ,
    html: htmlMessage,
    attachments: attachments
});
return info;

}