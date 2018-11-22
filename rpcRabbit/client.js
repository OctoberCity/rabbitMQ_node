const amqplib = require("amqplib/callback_api");
const taskname = "RPC";

const num =parseInt(process.argv[2]); 
const id = (new Date()).getTime();

function error(err,channel){
	console.error(err);
	if(channel){channel.close();process.exit(1);}
}

function listConnect(err,connection){
	if(err)return error(err);
	connection.createChannel((err,channel)=>{
		if(err)return(err,channel);
		channel.assertQueue('',{exclusive:true},(err,ok)=>{
			if(err)return channel(err,channel);
			const queue = ok.queue;
			//消费服务端发过来的消息
			channel.consume(queue,(message)=>{
				if(message.properties.correlationId== id){
				console.log("得到的结果是",message.content.toString());
			}else{
				console.log("我山大王"+id+"还没接到消息啊。。。。。。");
				channel.close(()=>{connection.close();});
			}
			},{noAck:true});
			//发送给服务端
			console.log(num);
			channel.sendToQueue(taskname,Buffer.from(num+''),{correlationId:id+'',replyTo:queue});
		});
	});
}
amqplib.connect("amqp://127.0.0.1",listConnect);
