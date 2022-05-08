import {MailAdapter,SendMailData} from '../mail-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "65600dece99d59",
    pass: "37e34a83c89fc3"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
 async sendMail({subject,body}: SendMailData){
     await transport.sendMail({
    from:'Equipe Feedget <oi@feedget.com>',
    to: 'Lucas Ribeiro <lucas1995ls@#outlook.com>',
    subject,
    html: body,

  })

 }
}