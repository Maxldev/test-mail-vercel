export default (req, res) => {
  require('dotenv').config()
  const nodemailer = require('nodemailer');

  async function mail() {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.mailsender,
        pass: process.env.mailpw,
      },
      secure: true,
    })
    let mail = transporter.sendMail({
      from: process.env.mailsender,
      to: process.env.mailreceive,
      subject: `${req.body.message}`,
      text: `${req.body.message}`,
      html: `<div><p>${req.body.message}</p></div>`
    });
  }
  
  try {
    mail();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(404);
  } finally {
    res.end();
  };
}