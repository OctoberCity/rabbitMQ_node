### rabbitMQ的简单应用
. 测试，rabbitMQ在egg框架的简单使用
. 在egg框架暴露两个接口，其中127.0.0.1:7001/sendByEgg为egg发送邮件，用户需要等待.
127.0.0.1:7001/sendByRabbit是通过消息队列发送

- cd eggClient
- npm run dev