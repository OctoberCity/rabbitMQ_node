// 生产者
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";



function error(err,channel){
 	console.error(err);
 	if(channel)process.exit(1);
 }

function listConnect(err,conn){
   	if(err) return  error(err);
  conn.createChannel((err,channel)=>{
   	channel.assertExchange(taskname,'fanout',{durable:fasle});
   	const msg=process.argv.sclice("2")[0];
   	//原来的sendToQueue变成publish来代替
   	channel.publish(taskname,'',Buffer.from(msg));
   	console.log("发送完毕，关闭");
   	channel.close(()=>{conn.close()});
     });
   };

    amqplib.connect("amqp://127.0.0.1",listConnect);