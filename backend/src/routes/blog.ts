import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import {verify } from 'hono/jwt'

// Create the main Hono app
const blogRouter = new Hono<{
    Bindings: {
        POOLING_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use(async(c,next)=>{
    const header = c.req.header('Authorization')

  if (!header) {
    return c.json({ error: 'Missing Authorization header' }, 401)
  }

  const token = header.split(' ')[1]

  if (!token) {
    return c.json({ error: 'Invalid Authorization header format' }, 401)
  }

  try {
    const response = await verify(token, c.env.JWT_SECRET)

    if (response.id) {
      c.set('userId', response.id as string)
      await next()
    } else {
      return c.json({ error: 'Unauthorised' }, 403)
    }
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }
})

blogRouter.post('/', async(c) => {
	console.log(c.get('userId'));
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.POOLING_URL	,
	}).$extends(withAccelerate());

    const body=await c.req.json();
    const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:body.authorId
        }
    })
    return c.json({
        id:post.id
    })
})

blogRouter.put('/',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.POOLING_URL	,
	}).$extends(withAccelerate());

    const body=await c.req.json();
    prisma.post.update({
        where:{
            id:body.id,
            authorId: c.get('userId')
        },data:{
            title:body.title,
            content: body.content
        }
    })
    return c.text('Post updated');
})

blogRouter.get('/:id',async(c)=>{
    const id=c.req.param('id');
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.POOLING_URL	,
	}).$extends(withAccelerate());

    const post=await prisma.post.findUnique({
        where:{
            id
        }
    })
    return c.json(post);
})

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.POOLING_URL	,
	}).$extends(withAccelerate());

    const post=await prisma.post.findMany({});
    return c.json(post);
})

export default blogRouter;