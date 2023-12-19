require('dotenv').config()
import cors from 'cors'
import express, { Request, Response } from 'express'
import router from './src/routes/route'


const port = process.env.PORT || 5002

const app = express()

app.use(
  cors({
    origin: process.env.PROJECT_URL
  })
)

app.use(express.json())

const server = app.listen(port, () => {
  console.log(`App listening on PORT: ${port}`);
});


app.get('/', ( req: Request, res: Response) => {
  res.send('<h3>E-commerce build on top of bitcoin lightening</h3>')
})

const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.PROJECT_URL],
  },
});


app.use(router)

export { io }
