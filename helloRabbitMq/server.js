// 消费者
const amqplib = require("amqplib");
const openCon = amqplib.connect("amqp://127.0.0.1");
const taskname = "helloworld";

openCon
.then((conn)=>{
	//创建通道
	return conn.createChannel();
})
.then((channel)=>{
	//监听helloworld对列
	return channel.assertQueue(taskname).then((ok)=>{
           //消费对列中的东西
           return channel.consume(taskname,(message)=>{
           	if(message){
           		console.log("receive the message is :==>",message.connent.toString());
           		channel.ack(message);
           	}
           });
	});
})
.then((task)=>{
	console.log('waiting for messages.....');
})
.catch(console.warn);
// var q = 'tasks';
// var open = require('amqplib').connect('amqp://localhost');

// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   return ch.assertQueue(q).then(function(ok) {
//     return ch.consume(q, function(msg) {
//       if (msg !== null) {
//         console.log(msg.content.toString());
//         ch.ack(msg);
//       }
//     });
//   });
// }).catch(console.warn);