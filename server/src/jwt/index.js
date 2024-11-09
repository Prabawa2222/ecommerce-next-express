const jwt = require('jsonwebtoken')

const jwtOption = (payload, key) => {
    const token = jwt.sign(payload, key, {
        expiresIn: "3h"
    })

    return token
}

module.exports = {
    jwtOption
}