// 生产者
const amqplib = require("amqplib");
const taskname = "helloCallBack";

 amqplib.connect("amqp://127.0.0.1",listConnect);


function listConnect(err,conection){
    connection.createChannel((channel)=>{
    	channel.assertQueue(taskname,(ok)=>{
    		// 取得控制台输入的参数
    		const params = process.argv.slice(2);
    		channel.sendToQueue(taskname,Buffer.from(params);
    	});
    });


}
 
 function error(err,channel){
 	if(err)console.log(err.message);
 	if(channel){
 		channel.close();
 		prcess.exit(1);
 	}
 }