import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import _default from 'hono/jsx';
import { createBlog, updateBlog } from '@shivanshplays/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
    Variables:{
        userid:string
        name:string
      
    }
}>();

blogRouter.use("/*",async (c,next)=>{

    const authHeader=c.req.header("Authorization")||"";

    // console.log(authHeader);
    const token = authHeader.split(" ")[1]||"some token";

    // console.log(token);

    try{
        const user= await verify(token,c.env.JWT_SECRET);

        // console.log(user.id);
        c.set("userid",user.id);
        await next();
    }catch(e){
        console.log("error is : "+e);

        c.status(403);
        return c.json({
            message:"unauthorised/token invaild"
        })
    }
});

blogRouter.post('/', async (c) => {
    function getFormattedDate(): string {
        const date: Date = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    }
    
    console.log(getFormattedDate());
    const date=(getFormattedDate());
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body=await c.req.json();
    const authorId = c.get("userid");

    const {success} = createBlog.safeParse(body);
    // console.log(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"wrong input format"
        })
    }
    try{
        const blog=await prisma.post.create({
        data:{
            title :body.title,
            content :body.content,
            authorId : authorId,
            date : date
        },
        })
    
        return c.json({
            blog
        });
    
    
    }catch(e){
        console.log(e);
        c.status(411);
        return c.text("error while uploading blog post");
    }
})

blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body=await c.req.json();
    const {success} = updateBlog.safeParse(body);
    // console.log(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"wrong input format"
        })
    }
    try{
        await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title :body.title,
            content :body.content
        },
        })
    
        return c.json({
            message:"blog updated"
        });
    
    
    }catch(e){
        console.log(e);
        c.status(411);
        return c.text("error while updating blog post");
    }
    
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs= await prisma.post.findMany({
            select:{
                title:true,
                content:true,
                id:true,
                date:true,
                author:{
                    select:{
                        name:true,
                        punchline:true
                    }
                }
            }
        });

        return c.json({
            blogs
        })
    }catch(e){
        console.log(e);
        c.status(411);
        return c.text("error while fetching all blog post");
    }
    
})



blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id=c.req.param('id');
    try{
        const blog=await prisma.post.findFirst({
            where:{
                id:id
            },
            select:{
                title:true,
                content:true,
                id:true,
                date:true,
                author:{
                    select:{
                        name:true,
                        punchline:true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
    
    
    }catch(e){
        console.log(e);
        c.status(411);
        return c.text("error while fetching blog post");
    }
})

//TODO: add pagination


