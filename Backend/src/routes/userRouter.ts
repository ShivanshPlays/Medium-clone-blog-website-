import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@shivanshplays/medium-common';


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string

	}
}>();

//TODO: add zod validation
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const {success} = signupInput.safeParse(body);
    // console.log(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"wrong input format"
        })
    }
    try{
        const user=await prisma.user.create({
        data:{
            email :body.email,
            password :body.password,
            name :body.name
        },
        })

        const jwt= await sign({id: user.id},c.env.JWT_SECRET);

        return c.json({
        jwt
        });


    }catch(e){
        console.log(e);
        c.status(411);
        return c.text("Invalid input");
    }
})




userRouter.post('/signin', async(c) => {
const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

const body=await c.req.json();

const {success} = signinInput.safeParse(body);
    // console.log(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"wrong input format"
        })
    }

try{
    const user=await prisma.user.findFirst({
    where:{
        email :body.email,
        password :body.password,
    },
    })
    console.log(user);
    if(!user){
    c.status(403);
    return c.json({
        message:"invalid credentials"
    })
    }
    const jwt= await sign({id: user.id},c.env.JWT_SECRET);

    return c.json({
    jwt
    });


}catch(e){
    console.log(e);
    c.status(411);
    return c.text("Invalid input");
}
})