// // 生产者
const amqplib = require("amqplib");
const openCon = amqplib.connect("amqp://127.0.0.1");
const taskname = "taskss";

openCon
.then((connection)=>{
	return connection.createChannel();
})
.then((channel)=>{
return channel.assertQueue(taskname).then((ok)=>{
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