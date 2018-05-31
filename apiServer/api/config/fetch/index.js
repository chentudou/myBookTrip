
const fs=require('fs');
const url=require('url');
module.exports= function(req,res,next){
    const api=_rootname+'/api/action';
    //获取每次请求的方法---转为小写--统一
    var method=req.method.toLowerCase();
    var reqUrl=url.parse(req.url).pathname;

    var newUrl=api+reqUrl+'/index.js';
    var newTypeUrl=api+reqUrl+'.js';
    //读取文件是否存在---如果存在就执行---不存在交由下一函数处理
    let loginStatus=req.body.loginStatus?req.body.loginStatus:req.query.loginStatus;
    /* console.log('aaaaaaaaaaaaaaa',req.query); */
    
    /*console.log('ccccccccccccccc',req.body.loginStatus); */
   // if(req.session.member||!Number(loginStatus)){
        //console.log('bbbbbbbbbbbbbbb',req.session.member);
        fs.stat(newUrl,function(err,stat){
            if(stat && stat.isFile()){
                console.log("文件存在",newUrl);
                let fn=require(newUrl);
                fn(req,res);
            }else{
                fs.stat(newTypeUrl,function(err,stat2){
                    if(stat2 && stat2.isFile()){
                        console.log("同名js文件存在",newTypeUrl);
                        let fn=require(newTypeUrl);
                        fn(req,res);
                    }else{
                        console.log('同名js文件不存在或文件不存在或文件不标准');
                        next();
                    }
                })
            }
         });
    /* }else{
        console.log('没有session')
        res.json({rescode:'0',msg:'登录失效,请重新登录'});
        //res.redirect('http://192.168.8.121:8090/#');
    } */
} 