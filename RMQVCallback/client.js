// 生产者
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";

 amqplib.connect("amqp://127.0.0.1",listConnect);


function listConnect(err,connection){
    if(err) return error(err);
    connection.createChannel((err,channel)=>{
        if(err)return error(err,channel);
    	channel.assertQueue(taskname);
    		// 取得控制台输入的参数
    		const params = process.argv.slice(2);
    	        console.log(params);	
               channel.sendToQueue(taskname,Buffer.from(params.join('')));;
    });


}
 
 function error(err,channel){
 	if(err)console.log(err.message);
 	if(channel){
                console.log("出错了");
 		channel.close();
 		prcess.exit(1);
 	}
 }
