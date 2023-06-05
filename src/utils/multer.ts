import multer from 'fastify-multer'
export const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5000000 },
})
