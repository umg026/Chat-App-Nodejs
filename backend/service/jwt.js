import jwt from 'jsonwebtoken';


export const genrateToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    // console.log("new token", token);
    
    res.cookie('uid', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax", 
    });
    return token;
}