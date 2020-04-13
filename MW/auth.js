const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async(req,res,next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ','')
        // const {token} = req.body
        let token = {}
        const token1 = req.body.token
        const token2 = req.query.token
        if(token1){
            token = token1
        }else{
            token = token2
        }
        // console.log(token2)
        // console.log(token1)
        console.log(token)

        const payload = jwt.verify(token, process.env.TOKEN_KEY)

        const user = await User.findOne({ _id: payload._id,
                                          'tokens.token': token })
        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token
        

        next()

    } catch (error) {
        res.status(401).json({ error: 'Not auth'})
    }
}

module.exports = auth