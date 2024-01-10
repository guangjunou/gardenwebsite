const nodemailer = require('nodemailer');
const Joi = require('joi');

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
    if (lang === 'en') {
    res.redirect('/get-a-quote', { lang: 'en'})
    } else if (lang === 'zh') {
    res.redirect('/get-a-quote', { lang: 'zh'})
    }
}
