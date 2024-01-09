const nodemailer = require('nodemailer');
const Joi = require('joi');

const formSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required().min(0).max(11),
    purpose: Joi.string().required(),
    service: Joi.string().required()
});

module.exports.createEmail = async (req, res, next) => {
    // const formData = req.body
    const { name, email, message, phoneNumber, service, purpose } = req.body;

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
            text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${purpose}\nService: ${service}\nMessage: ${message}`
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
    res.redirect('/get-a-quote')
}
