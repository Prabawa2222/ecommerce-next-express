import User from "../users/usersModel";

// Register
export const userRegister = async(req, res) => {
    try {

        const {name, email, password} = req.body; // request from body
        const existUser = await User.findOne({  // find exist database
            where: {
                email
            }
        })

        if(existUser) throw {message: "email has been taken !"}

        // generate token
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)

        const registeredUser = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })

        delete registeredUser.password  // delete password for not showing in res

        res.status(201).send({
            success,
            statusCode: 201,
            message: "User has been registered",
            registeredUser
        })

        
    } catch (error) {
        res.status(500).send({
            error,
            status: 500,
            message: 'Internal server error',
        })
    }
}

// Login
export const userLogin = async(req, res) => {
    try {
        
        const {email, password} = req.body;

        const checkLogin = await User.findOne({
            where: { email: email }
        })

        if(!checkLogin) throw {message: "username / password not registered"}  // check email exist or not

        const isMatch = await bcrypt.compare(password, registeredUser.password)
        if(!isMatch) throw {message: "username / password not registered"}  // check password

        const payload = {
            id: checkLogin.id,
            role: checkLogin.role
        }
        
        const token =  JWT.sign(payload, process.env.JWT_SECRET_KEY) // sign jwt

        res.status(201).send({
            success,
            token,
            message: "login successfully"
        })

    } catch (error) {

        res.status(500).send({
            error,
            status: 500,
            message: 'Internal server error',
        })
        
    }
}