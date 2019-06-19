const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

let auth = {
  auth: {
    api_key: require("../config/keys").mailerAPIkey,
    domain: require("../config/keys").mailerDomain
  }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (emailBody, cb) => {
  let mailOptions = {
    from: emailBody.email,
    to: require("../config/keys").clientEmail,
    subject: "devForhad.io",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>New Message from site</title>
      </head>
      <body>
        <div style="padding: 20px;background: linear-gradient(to left, rgb(11, 65, 152) 0%, rgb(3, 39, 39) 100%);color: aliceblue;font-family: sans-serif;">
          <h1 style="font-weight: 600;text-align: center;font-family: sans-serif;"><span style="font-weight: 100;">dev</span>Forhad<span style="font-weight: 100;">.io</span></h1>
          <h4 style="font-weight: 200;">Name: ${emailBody.name}</h4>
          <h4 style="font-weight: 200;">Email: ${emailBody.email}</h4>
          <h4 style="font-weight: 200;">Skype: ${
            emailBody.skype ? emailBody.skype : "Not Given"
          }</h4>
          <h4 style="font-weight: 200;">Message: ${emailBody.message}</h4>
        </div>
      </body>
    </html>
    `
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null);
      console.log("Error Occurs", err);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
