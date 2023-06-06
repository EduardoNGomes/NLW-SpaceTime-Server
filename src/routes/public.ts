import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function publicRoutes(app: FastifyInstance) {
  app.get('/public', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
        createdAt: memory.createdAt,
        author: memory.user.name,
      }
    })
  })
}
