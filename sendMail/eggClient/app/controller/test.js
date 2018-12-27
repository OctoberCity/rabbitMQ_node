'use strict';
const nodemailer = require('nodemailer');
const amqplib = require("amqplib/callback_api");
const Controller = require('egg').Controller;
// const connection = new Promise((resolve, reject) => {
//     amqplib.connect("amqp://127.0.0.1", (err, connection) => {
//         if (err) reject(err);
//         resolve(connection);
//     });
// });


class HomeController extends Controller {

    async sendByEgg() {
        //邮箱发附件
        let transporter = nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            port: 465, // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
                user: '1730653658@qq.com',
                //设置的smtp授权码
                pass: 'sfbhpttlxdfrcjaj',
            }
        });

        let mailOptions = {
            from: '1730653658@qq.com',
            to: '13123387218@163.com',
            subject: 'Hello',
            html: '<b>Hello world?</b>'
        };

        const messageId = await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            return info.messageId;
        });
    }
    //发送至消息队列
    async sendByRabbit() {
        const random = Math.random(0, 1) * 10;
        connection.then((connection) => {
            if (err) return error(err);
            connection.createChannel((err, channel) => {
                if (err) return error(err, channel);
                channel.assertQueue(taskname);
                channel.sendToQueue(taskname, Buffer.from(random));;
            });
        }).catch((err) => {
            error(err);
        });

        function error(err, channel) {
            if (err) console.log(err.message);
            if (channel) {
                channel.close();
                prcess.exit(1);
            }
        }
    }



}

module.exports = HomeController;