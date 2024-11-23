import {model, Schema} from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
        default : 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
    },
}, {timestamps : true})

const User = model("User", userSchema)


module.exports = User