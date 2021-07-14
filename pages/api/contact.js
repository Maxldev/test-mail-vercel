export default (req, res) => {
  require('dotenv').config()
  const nodemailer = require('nodemailer');

  async function mail() {
    console.log('enter async function');
    const transporter = nodemailer.createTransport({
      name: "smtp.zoho.eu",
      port: 465,
      host: "smtp.zoho.eu",
      auth: {
        user: process.env.mailsender,
        pass: process.env.mailpw,
      },
      secure: true,
    })
    let mail = await transporter.sendMail({
      from: process.env.mailsender,
      to: process.env.mailreceive,
      subject: `${req.body.message}`,
      text: `${req.body.message}`,
      html: `<div><p>${req.body.message}</p></div>`
    });
  }
  
  try {
    console.log('sending mail');
    mail();
    res.status(200);
    console.log('mail should be sent');
  } catch (error) {
    console.log(error);
    console.log('error sending mail');
    res.status(404);
  } finally {
    res.end();
  };
}