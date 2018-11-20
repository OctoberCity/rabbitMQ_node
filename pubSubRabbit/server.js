//消费者 sub
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";

function error(err,channel){
	console.error(err);
	if(channel){process.exit(1);}
}

function listconnect(err,connection){
	       return error(err);
	connection.createChannel((err,channel)=>{
		if (err)return error(err,channel);
			// fanout为广播模式，type:fanout,direct topic headers 
		channel.assertExchange(taskname,'fanout',{durable:false},(err)=>{
			if(err) return error(err,channel);
			channel.assertQueue('',{exclusive:true},(err,ok)=>{
				const queue=ok.queue;
				//‘’是路由操作参数
				channel.bindQueue(queue,taskname,'');
				channel.consume(queue,(meg)=>{
					//消费对列消息
					const message =meg.content.toString();
					console.log("消费的内容是",message);
				});
			});
		});
	});
}



amqplib.connect("amqp://127.0.0.1",listconnect);
