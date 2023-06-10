import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/user/user.routes'

const app: Application = express()

app.use(cors())
// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello from UM Server')
})

export default app
