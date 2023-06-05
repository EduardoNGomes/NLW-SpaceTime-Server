import { FastifyInstance } from 'fastify'
import { createImageUrl } from '../utils/upload-cloud'
import { upload } from '../utils/multer'

export async function uploadRoutes(app: FastifyInstance) {
  app.post(
    '/upload',
    { preHandler: upload.single('cover') },
    async (request, reply) => {
      console.log('oi')
      const imageFile = request.file
      if (!upload) {
        return reply.status(400).send()
      }

      const response = await createImageUrl(imageFile.path)
      return { fileUrl: response?.url }
    },
  )
}
