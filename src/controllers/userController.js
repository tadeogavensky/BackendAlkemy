const db = require("../database/models")
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail')

const API_KEY = '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'

sgMail.setApiKey(API_KEY)

var regexEmail = /\S+@\S+\.\S+/;

const userController = {
    login: (req, res) => {

        let userToAuth = req.query.email
        let passwordToAuth = req.query.password

        if (regexEmail.test(userToAuth) == true) {

            db.User.findOne({
                where: {
                    email: userToAuth,
                    deleted: 0
                }
            }).then(email => {
                let error = 'User not found'
                if (email != undefined) {
                    if (bcrypt.compareSync(passwordToAuth, email.password)) {
                        console.log('User Authenticated')
                        let token = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
                        res.cookie('token', token, {
                            maxAge: (24 * 1000 * 60) * 2
                        })

                        let response = {
                            email: email.email,
                            token: {
                                msg: 'Click here to get your token ',
                                token: 'http://localhost:4000/token'
                            }
                        }
                        res.json(response)
                    } else {
                        res.json('The password is incorrect')
                    }

                } else {
                    res.json(error)
                }
            }).catch(error=>{
                res.send(error)
            })
        } else {
            res.json('You need to enter a valid email')
        }
    },
    register: (req, res) => {


        let userToAuth = req.query.email
        let passwordToAuth = req.query.password

        const message = {
            to: userToAuth,
            from: 'tadeogavensky.email@gmail.com',
            subject: 'From Tadeo via SendGrid',
            text: 'Hi welcome to your new account in the API service to get information about Movies, Series and Characters, please feel free to use at any time and remember that the token provided to you expires after some time and you need to login again to get a new one. Thank you and enjoy!'
        }

        if (regexEmail.test(userToAuth) == true) {
            db.User.findOne({
                where: {
                    email: userToAuth,
                }
            }).then(email => {
                if (email != undefined) {
                    res.json('User already exists')
                } else {
                    db.User.create({
                        email: req.query.email,
                        password: bcrypt.hashSync(req.query.password, 10),
                        deleted: 0
                    }).then(email => {
                        console.log('User Created')

                        sgMail
                        .send(message)
                        .then(res=>{console.log('res', res)})
                        .catch(error=>{res.send(error)})
                        
                        let response = {
                            email: 'Hello new user: ' + email.email,
                            token: 'Please login to get your token '
                        }
                        
                        res.json(response)
                    })
                }
            }).catch(error=>{
                res.send(error)
            })
        } else {
            res.json('You need to enter a valid email')
        }
    },


}

module.exports = userController;