//"Is this request from a logged-in user?"
const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.header("Authorization");//frontend send the token in the Authorization header of the request.
    // The backend retrieves this token using req.header("Authorization").
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, "secretkey");//The backend then verifies the token using jwt.verify() with the same secret key that was used to sign the token during login.
        req.user = decoded;//If the token is valid, it decodes the token to get the user ID and attaches it to the req object (req.user) for use in subsequent middleware or route handlers.
        next();//Finally, it calls next() to pass control to the next middleware or route handler in the stack.
    }
    catch (err) {

    res.status(401).json({
      message: "Invalid token"
    });
}
}

module.exports=auth;//exports the auth middleware function so that it can be used in other parts of the application, such as in route handlers to protect certain routes and ensure that only authenticated users can access them.