import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'

// Create the main Hono app
const userRouter = new Hono<{
	Bindings: {
		POOLING_URL: string,
		JWT_SECRET: string,
	}
}>();



userRouter.post('/api/v1/signin', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.POOLING_URL	,
	}).$extends(withAccelerate());

	const body=await c.req.json();
	try{
		const user=await prisma.user.findUnique({
			where:{
				email:body.email,
                password:body.password
			}
		})
		if(!user){
			c.status(403);
			return c.json({error:"user not found"});
		}

		const jwt=await sign({id:user.id},c.env.JWT_SECRET);
		return c.json({jwt});
	}catch(err){
		c.status(403);
		return c.json("signin failed");
	}

})

userRouter.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.POOLING_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

export default userRouter;