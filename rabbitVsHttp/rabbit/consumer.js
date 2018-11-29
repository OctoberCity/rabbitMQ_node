//改文件是真正处理请求的，只是转化成了reabbit队列,
const goodsmodel= require("../model/goodModel.js");
const rabbit =require("amqplib/callback_api");


function error(err,channel){
    console.error(err);
    if(channel){
        channel.close();
    }
}
async function  connection(err,connection){
    if(err)error(err);
    connection.createChannel((err,channel)=>{
        if(err)error(err,channel);
         channel.assertQueue("",{});
         channel.consume("",(message)=>{
             if(message.properties.correlationId){
                const  count = await goodsmodel.findAllNum({});
                       if(count>100){
                           channel.sendToQueue("",Buffer.from(),{});
                       }else{
                           await goodsmodel.insertGoodsByObj({userid:message.content.toString()})
                           channel.sendToQueue("",Buffer.from("卖家"+userid+"抢购到了第"+count+"件商品"));
                       }     
             }
         });
    });


}

rabbit.connect("amqp://localhost",connection);