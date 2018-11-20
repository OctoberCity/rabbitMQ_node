//  消费者
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";

//获取路由参数
const routerPar =process.argv.slice(2);  



function error(err,channel){
	console.error(err);
	if(channel){process.exit(1);}
}

function listConnection(err,connection){
  if(err) return error(err);
  connection.createChannel((err,channel)=>{
  	if(err) return error(err,channel);
  	channel.assertExchange(taskname,'direct',{durable:false});
  	channel.assertQueue('',{exclusive:true},(err,ok)=>{
  		if(err) return error(err);
  		const queue=ok.queue;
         routerPar.forEach((item)=>{
         	//绑定对列路由
               console.log(item);	
              channel.bindQueue(queue,taskname,item);
         });
         // 消费对列中特定路由消息
         channel.consume(queue,(msg)=>{
                    
         	console.log("路由是",msg.fields.routingKey);
         	console.log("内容是",msg.content.toString());
         },{noAck:true});
  	});
  });
}


amqplib.connect('amqp:127.0.0.1',listConnection);


