import JWT from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config()

export const verifyToken = (req, res) => {

    try {
        let token = req.headers.authorization
        if(!token) throw {statusCode: 401, message: "Token is missing"}
    
        token = token.split(' ')[1] // parse the jwt value
    
        let isVerified;
        try {
            isVerified = JWT.verify(token, process.env.KEY_JWT);
        } catch (error) {
            error.statusCode = 401;
            if (error.name === 'TokenExpiredError') {
                error.message = 'Token expired.';
            } else if (error.name === 'JsonWebTokenError') {
                error.message = 'Malformed token.';
            } else {
                error.message = 'Unauthorized request.';
            }
            throw error;
        };

        req.user = isVerified
        next();
        
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: error
        })
    }


}
