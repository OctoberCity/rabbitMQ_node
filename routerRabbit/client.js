// 生产者  fanout是广播
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";

//获取信息和路由参数(只带有一个路由参数和一个message的情况下)
const args =process.argv.slice(2);
const msg =args.slice(1)[0];
const routerPar = args[0];



function error(err,channel){
 	console.error(err);
 	if(channel)process.exit(1);
 }

function listConnect(err,conn){
   	if(err) return  error(err);
  conn.createChannel((err,channel)=>{
    // 使用direct而不是fanout扇出
   	channel.assertExchange(taskname,'direct',{durable:false});
 
   	channel.publish(taskname,routerPar,Buffer.from(msg));
   	console.log("发送完毕，关闭 发送消息是：==》"+routerPar+msg);
   	channel.close(()=>{conn.close()});
     });
   };

    amqplib.connect("amqp://127.0.0.1",listConnect);
