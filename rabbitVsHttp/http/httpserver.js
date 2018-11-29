const koa =require("koa");
const router =require("koa-router")();
const goodmodel = require("./model/goodModel.js"); 


const app = new koa();
app.use(router.routes());


router.get("/",async(ctx)=>{
	ctx.body="你好这里是http的服务";
}) 

router.get("/buy",async(ctx)=>{
    const id=ctx.request.query.id; 
	const count = await goodmodel.findAllNum({});
        console.log(count);
	if(count>=100){
	  return ctx.body="已经卖完";
	}
    await goodmodel.insertGoodsByObj({userId:id}); 
    ctx.body="购买人编号是：" + id;
});



app.listen("3000",()=>{
	console.log("http服务已经启动正在监听3000端口");
})

