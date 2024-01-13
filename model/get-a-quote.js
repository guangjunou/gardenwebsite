const nodemailer = require('nodemailer');
const Joi = require('joi');
const i18n = require('i18n');
const express = require('express');
const path = require('path');

const app = express();

i18n.configure({
    locales: ['en', 'zh'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'language',
    queryParameter: 'lang',
    autoReload: true,
    updateFiles: false,
});

app.use(i18n.init);

const formSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phoneNumber: Joi.number().required(),
    purpose: Joi.string().required(),
    service: Joi.string().required(),
    messages: Joi.any()
});



module.exports.createEmail = async (req, res, next) => {
    const { name, email, messages, phoneNumber, service, purpose } = req.body;
    const formData = req.body

    const validationResult = formSchema.validate(formData);
    if (validationResult.error) {
        const errors = validationResult.error.details.map(detail => detail.message);
        return res.status(400).send({ errors });
    }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ougaungjun@gmail.com',  // Replace with your Gmail email address
                pass: 'xsat pwhs ddgt nams'         // Replace with your Gmail password or an app-specific password
            }
        });


        const mailOptions = {
            from: 'ougaungjun@gmail.com',    // Replace with your Gmail email address
            to: 'ougaungjun@gmail.com',    // Replace with your actual email address
            subject: 'New Quote',
            text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${purpose}\nService: ${service}\nMessage: ${messages}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.send('Error sending email.');
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Email sent successfully.');
            }
        });
 
    
    req.flash("success", "Your message sent successfully!!");

    res.redirect('back')
}
