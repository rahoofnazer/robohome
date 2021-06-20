const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');
var session = require('express-session');
var collection = require('../config/collection');
const user_helpers = require('../helpers/user_helpers');


const generatePdf = async (req, res, next) => {
    
       if (req.session.user){
        const html = fs.readFileSync(path.join(__dirname, '../views/user/template.html'), 'utf-8');
        const filename = 'robohome_certificate_' + Math.random() + '.pdf';
        const user = req.session.user
        var updateduser = {}
        await user_helpers.getUser(user).then((response)=>{
            console.log('response is');
            console.log(response);
            updateduser = response
            console.log("updateduser.user---------------- : ")

            console.log(updateduser)
          })

         const document = {
             
            html: html,
            data: {
                user: updateduser
            },
            

            path: './docs/' + filename
        }

     
        pdf.create(document, options)
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
            // const filepath = 'http://localhost:3000/docs/' + filename;
            const filepath = 'https://robohome.co.in/docs/' + filename;

                res.render('download', {
                    path: filepath
               
            });
            console.log(path)
            req.session.destroy()

       }else{
            res.redirect('/')
       }
        
}


module.exports = {
    
    generatePdf
}