const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, 'Deepak', { expiresIn: '1h' });
    return token;
};


module.exports = generateToken ;


