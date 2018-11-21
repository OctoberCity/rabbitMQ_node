const amqplib = require("amqplib/callback_api");
const taskname = "RPC";

 amqplib.connect("amqp://127.0.0.1",listConnect);

function error(err,channel){
	console.error(err);
	if(channel){channel.close();process.exit(1);}
}

function listConnect(err,connection){
	connection.createChannel((err,channel)=>{
		if(err)return error(err,channel);
        channel.assertQueue(taskname,{durable:false}; 
        //设置不会向繁忙的消费者在传一条的消息
        channel.prefetch(1);
        //noAck:false设置有响应
        channel.counsume(taskname,{noAck:false},(err,message)=>{
        	if(err)return error(err,channel);
             const num =parseInt(message.content.toString());
             channel.sendToQueue(message.properties.replyTo,Buffer.from(num+1+''),{ID:message.properties.ID});
            //响应队列告知已经处理完毕
             channel.ack(msg);
        });
	});
}