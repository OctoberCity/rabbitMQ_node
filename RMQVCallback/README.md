### rabbitmq 
> rabbitMQ是一个消息代理，他接受转发消息，你发送消息，那么rabbitMQ接受到你的消息然后发送给收件人。rabbitMQ不对消息进行任何处理操作，仅仅接受，存储，转发blob消息。rabbitMQ是消息队列，既然是队列那么就要排队，你可以想象你发的消息进入rabbitmq之后的样子，一封封邮件以队列的形式，排列，底座是滑轮，邮件有序按照特定的出口（收件人）送出。

#### 有几个概念
1. RabbitMQ队列是运行在电脑上的，虽然队列中的消息会被消耗，但是rabbitMq中依然会有消息(消息过多，接收消息速度大于消耗速度)，制约其数量是存储器以及磁盘限制约束。
2. 发送消息的是生产者，接收消息的是消费者，而生产者既可以是生产者也可以是消费者


#### Rabbit 的 hello world
[github地址](https://github.com/OctoberCity/rabbitMQ_node/tree/master/RMQVCallback)(回调函数版)
- 生产者(client.js)
```
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";


function error(err, channel) {
    if (err) console.log(err.message);
    if (channel) {
        console.log("出错了");
        channel.close();
        prcess.exit(1);
    }
}

amqplib.connect("amqp://127.0.0.1", listConnect); //连接rabbitmq,传入回调接收connection

function listConnect(err, connection) {
    if (err) return error(err);
    connection.createChannel((err, channel) => { // 创建一个频道channel 
        if (err) return error(err, channel);
        channel.assertQueue(taskname); //申明一个通道
        //  取得控制台输入的参数
        const params = process.argv.slice(2);
        console.log(params);
        channel.sendToQueue(taskname, Buffer.from(params.join('')));//向申明的通道发送消息
    });


}

```

- 消费者(server.js)//这里没做错误处理，懒。。[about rabbitMQ](http://www.rabbitmq.com/confirms.html)
```
const amqplib = require("amqplib/callback_api");
const taskname = "helloCallBack";

amqplib.connect("amqp://127.0.0.1", listConnect); //连接rabbitMq服务器，传入回调接收connection

function listConnect(err, connection) {
    connection.createChannel((err, channel) => {    // 创建频道
        channel.assertQueue(taskname);             // 申明队列
        channel.consume(taskname, (message) => {   //频道消费特定队列的数据
            console.log("接收到的数据是", message.content.toString());
            setTimeout(() => {                     // 模仿插入数据库的操作
                console.log("三秒插入数据库");
                channel.ack(message);             // 响应client.js客户端,不响应是nack
            }, 3000);
        });
    });
}
```

- 在服务器上跑一下，看一下效果,(注意,用两种方式启动，先启动server.js以及先启动client.js)
  - node server.js
  - node client.js  firstmessage 
  - 效果如下：
  
  ![image](https://note.youdao.com/yws/public/resource/2366cfb1a6a91c297a4562260c257a23/xmlnote/90B11EAD609B448F84519C0857633986/7349)
  


- 如上图我们的rabbitMQhelloworld成功了，但是借助上面的代码我有几个疑问：
  - 我们向对列中发送一个消息，如果队列一直没接收，消息该何去何从？
  - 我们相对发送多条消息，消费者接受消息的顺序如何？
  - 我们ack(message),但是如果不响应ack(message)，是不是该消息就不算被消费？
  


- 为此，我们开启三个远程连接窗口，两个client.js,一个server.js,先开启两个client.js.传入参数"first message","second message"。其中"first mesage"先启动发送。这时候模拟了消息发送但是未被消费，且有先后执行的问题，接着执行服务端，打印输出如下图：
![image](https://note.youdao.com/yws/public/resource/2366cfb1a6a91c297a4562260c257a23/xmlnote/28C240BBACAC41A4A0D3C9A64012F4EB/7540)
> 可以看见这个rabbitMQ对于信息接收是顺序接收的，且消息队列一直没被消费会一直存在电脑中[关于消息存储](http://www.rabbitmq.com/persistence-conf.html)

- 第二个问题，不响应客户端ack[关于确认](http://www.rabbitmq.com/confirms.html#when) (message)会怎么样，我们先启动client.js,发送消息noReponseMessage.并且vim server.js,修改部分代码，将server.js的ack(message)修改nack(message)，启动server.js,打印如下图：![image](https://note.youdao.com/yws/public/resource/2366cfb1a6a91c297a4562260c257a23/xmlnote/4FFC1BB6483641A59A0ED1661C38C985/7578)