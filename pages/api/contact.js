export default (req, res) => {
    require('dotenv').config()
    
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.mailsender,
        pass: process.env.mailpw,
      },
      secure: true,
    })
    const mailData = {
      from: process.env.mailsender,
      to: process.env.mailreceive,
      subject: `${req.body.message}`,
      text: `${req.body.message}`,
      html: `<div><p>${req.body.message}</p></div>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err) {
        console.log(err);
        console.log(info);
        res.status(404);
      }
      else {
        res.status(200);
      }
      res.end();
    })
  }