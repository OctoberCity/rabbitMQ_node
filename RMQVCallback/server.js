// 消费者
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";

amqplib.connect("amqp://127.0.0.1", listConnect);


function listConnect(err, connection) {
    connection.createChannel((err, channel) => {
        channel.assertQueue(taskname);
        channel.consume(taskname, (message) => {
            console.log("接收到的数据是", message.content.toString());
            setTimeout(() => {
                console.log("三秒插入数据库");
                channel.ack(message);
            }, 3000);
        });
    });


}

/** function desmessage(data){
 	const mes = data.content.toString();
 	console.log("接收到的数据是：==》", mes);
 	setTimeout(()=>{
         console.log("插入数据库花了三秒钟");
         channel.ack(data.message);
 	},3000);
 }***/