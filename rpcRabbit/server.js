const amqplib = require("amqplib/callback_api");
const taskname = "RPC";


function error(err,channel){
	console.error(err);
if(channel){channel.close();process.exit(1);}
}

function fib(num){
let a=0;
let b=1;
for(let i=0;i<num;i++){
  let c =a+b;
    a=b;b=c;
   }
  return a;
}
function listConnect(err,connection){
	connection.createChannel((err,channel)=>{
		if(err)return error(err,channel);
        channel.assertQueue(taskname,{durable:false}); 
        //设置不会向繁忙的消费者在传一条的消息
        channel.prefetch(1);
        //noAck:false设置有响应
        channel.consume(taskname,(message)=>{
        	if(err)return error(channel);
             const num =parseInt(message.content.toString());
             console.log("接受了fib("+num+")");
            channel.sendToQueue(message.properties.replyTo,Buffer.from(fib(num)+''),{correlationId:message.properties.correlationId});
            //响应队列告知已经处理完毕
             channel.ack(message);
        },{noAck:false});
	});
}
 amqplib.connect("amqp://127.0.0.1",listConnect);
