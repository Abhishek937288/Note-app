 import "dotenv/config";

export const protectRoute = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
     return res.redirect("/signIn");
    }
    try{
     const decoded = jwt.verify(token,process.env.TOKEN_KEY);
     req.user = decoded;
     next();
    }catch(err){
    return res.redirect("signIn")
    }
}