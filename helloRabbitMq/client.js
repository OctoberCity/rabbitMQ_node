// 生产者
const amqplib = require("amqplib");
const openCon = amqplib.connect("amqp://127.0.0.1");
const taskname = "helloworld";

openCon
.then((connection)=>{
	return connection.createChannel();
})
.then((channel)=>{
return ch.assertQueue(taskname).then((ok)=>{
     return ch.sendToQueue(taskname,Buffer.from('hello world'))
  });
})
.catch(console.warn);