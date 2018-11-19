// // 生产者
const amqplib = require("amqplib");
const openCon = amqplib.connect("amqp://127.0.0.1");
const taskname = "helloworld";

openCon
.then((connection)=>{
        //console.log("创建通道");
	return connection.createChannel();
})
.then((channel)=>{
console.log("监听通道");
return channel.assertQueue(taskname).then((ok)=>{
     console.log("开始发送消息");
     return channel.sendToQueue(taskname,Buffer.from('hello world'))
  });
})
.catch(console.warn);

// var q = 'tasks';

// var open = require('amqplib').connect('amqp://localhost');

// // Publisher
// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   return ch.assertQueue(q).then(function(ok) {
//     return ch.sendToQueue(q, Buffer.from('something to do'));
//   });
// }).catch(console.warn);
