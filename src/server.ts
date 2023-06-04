import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'
import { env } from './env'
import multer from 'fastify-multer'
export const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
})

const app = fastify()

app.register(cors, {
  origin: true,
})

// app.register(multipart)
app.register(multer.contentParser)

app.register(jwt, {
  secret: 'spacetime',
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('listening on port', env.PORT)
  })
