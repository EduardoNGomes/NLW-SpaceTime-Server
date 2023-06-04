import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream, unlinkSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { createImageUrl } from '../utils/upload-cloud'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fieldSize: 5_242_880, // 5mb
      },
    })
    if (!upload) {
      return reply.status(400).send()
    }
    const mimetypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimetypeRegex.test(upload.mimetype)
    if (!isValidFileFormat) {
      return reply.status(400).send()
    }
    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)
    const writeStream = createWriteStream(
      resolve(__dirname, '../uploads', fileName),
    )
    await pump(upload.file, writeStream)
    const response = await createImageUrl(
      resolve(__dirname, '../uploads', fileName),
    )

    unlinkSync(resolve(__dirname, '../uploads', fileName))

    return { fileUrl: response?.url }
  })
}
