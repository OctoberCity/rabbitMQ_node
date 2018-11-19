// 消费者
const amqplib = require("amqplib");
const taskname = "helloCallBack";

 amqplib.connect("amqp://127.0.0.1",listConnect);


function listConnect(conection){
    connection.createChannel((channel)=>{
    	channel.assertQueue(taskname,(ok)=>{
    		channel.consume(taskname,(message)=>{
    			desmessage({message,channel});
    		});
    	});
    });


}

 function desmessage(data){
 	const mes = data.message.content.toString();
 	console.log("接收到的数据是：==》", mes);
 	setTimeOut(()=>{
     console.log("插入数据库花了三秒钟");
     data.channel.ack(data.message);
 	},3000);
 }