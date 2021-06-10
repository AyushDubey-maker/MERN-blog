const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
try{
const token=req.cookies.token;
if(!token){
return res.status(401).json({errorMessage:"Unauthorized User"})
}
const verified=jwt.verify(token,process.env.JWT_SECRET);
req.user=verified.user;
// Next is the express function
next();
}catch(err){
console.log(err)
res.status(401).json({errorMessage:"Unauthorized User"})
}
}

module.exports=auth;