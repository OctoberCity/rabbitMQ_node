const koa=require("koa");
const router =require("koa-router")();

new app= new koa();

app.use(router.routes);

const userid=0;
 router.get("/buy/",async(ctx)=>{
  const queuename="hjw";
  const querouter="buy";
  const correlationId = (new Date()).getTime()+Math.random()*10;
  userid++;
//这里是rabbit服务消费者，通过消费特定的对列的路由的消息。
const rabbit=require(amqplib/callback_api);
//处理错误
function error(err,channel){
    console.error(err);
    if(channel){
        channel.close();
        // process.exit(1);
    }
}

function connectF(err,connection){
    if(err)error(err);
    connection.createChannel((err,channel)=>{
        channel.assertQueue(queuename,{durable:false},(err,ok)=>{
            if(err)error(err,channel);
               channel.consume(queuename,(message)=>{
                   //返回消息
                   if(message.properties.correlationId=correlationId){
                    ctx.body=message.content.toString();
                    //连接不关
                    channel.close();
                   }
                 
               },{noAck:true});
               channel.sendToQueue(querouter,Buffer.from(userid),{correlationId,replayTo:queuename});  
        });
    });
}






    rabbit.connect("amqp://localhost",connectF);
 });



