import { app } from "../config/socket"
import { msgRouter } from "./msg"
import { authRouter } from "./users"

app.use('/api/auth', authRouter)
app.use('/api/msg', msgRouter)