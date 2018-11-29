// 该文件使用来重定向3000主端口的入口，
// 文件监听5000 端口，提供商品购入额服务监听3000端口
// 使用nginx反向代理至3000端口

const Koa =require("koa");
const koarouter =require("koa-router")(); 
const request =require("request");
const util =require("util");
const app =new Koa();
let   id =0;

//暴露给外界的购买接口
const goBuyUrl ="http://127.0.0.1:3000/buy";

app.use(koarouter.routes());

//代理模拟外界请求
koarouter.get("/buy/",async(ctx)=>{
	//发送请求给goBuyUrl
    const res =ctx.res;
               id=id+1;
    const dd= await new Promise((solve)=>{
        request({
		method:'GET',
		timeout:30000,
        url:goBuyUrl+'?id='+id , 
	},(err,res,body)=>{
		if(err){ 
		 solve(err);
        } 
        solve(body);
    });
});
    console.log(dd);
    ctx.response.body= dd;
   });
 



app.listen(5000,()=>{
	console.log("模拟外界接口请求服务监听5000已经启动");
});
