// 消费者
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";

amqplib.connect("amqp://127.0.0.1", listConnect);


function listConnect(err, connection) {
    connection.createChannel((err, channel) => {
        channel.assertQueue(taskname);
        channel.consume(taskname, (message) => {
            console.log("接收到的数据是", message.content.toString());

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
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                channel.ack(message);   
            });
       
        });
    });


}

 