const mongoose = require("mongoose");
const connect = "mongodb://localhost:27017/httpVsRabbit";

const poolSize= 50;
mongoose.connect(connect,{server:{poolSize:poolSize}});
const Schema =mongoose.Schema;
const goodSchema =new Schema({
	userId:{type:Number},
	createTime:{type:Date,default:new Date()}
});

//查询总数目
goodSchema.statics.findAllNum=function(){
     return this.count({},(err,count)=>{
     });
}

// 插入操作
goodSchema.statics.insertGoodsByObj =function(obj){
   return this.create(obj,(err,doc)=>{
   });
}
module.exports = mongoose.model('goods',goodSchema);
