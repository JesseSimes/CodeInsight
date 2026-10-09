const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const authMiddleware = (req,res,next) =>{
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message:"Authorization failed"
            })
        }

        const token = authHeader.split(" ")[1];

         if (!token) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }

        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded;

        next();
        
    } catch (error) {
        console.log("Internal server error", error)

        res.status(500).json({
            message:"Invaild or expired token"
        })
    }
}

module.exports = authMiddleware