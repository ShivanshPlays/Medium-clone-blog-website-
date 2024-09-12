import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import _default from 'hono/jsx';
import { createBlog, updateBlog, deleteBlog } from '@shivanshplays/medium-common';

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

//user authentication middleware

blogRouter.use("/modify",async (c,next)=>{

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

        c.status(401);
        return c.json({
            message:"unauthorised/token invaild"
        })
    }
});

//authenticated routes: post blog, edit blog, delete blog

blogRouter.post('/modify', async (c) => {
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
        return c.json({
            msg:"error while uploading blog post"}
        );
    }
})

blogRouter.put('/modify', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body=await c.req.json();
    const authorId = c.get("userid");

    const {success} = updateBlog.safeParse(body);
    
    if(!success){
        c.status(411);
        return c.json({
            message:"wrong input format"
        })
    }
    try{
        await prisma.post.update({
        where:{
            id:body.id,
            authorId : authorId
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
        return c.json({
            msg:"error while updating blog post, maybe authorid is not matching"
    });
    }
    
})

blogRouter.delete('/modify', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body=await c.req.json();
    const authorId = c.get("userid");

    const {success} = deleteBlog.safeParse(body);
    // console.log(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"missing blog id"
        })
    }
    try{
        await prisma.post.delete({
        where:{
            id:body.id,
            authorId : authorId
        }
        })
    
        return c.json({
            message:"blog deleted"
        });
    
    
    }catch(e){
        console.log(e);
        c.status(411);
        return c.json({
            msg:"error while deleting blog post"
    });
    }
    
})


//open for all
blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    // .$extends(withAccelerate());

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

        if(!blogs){
            return c.json({
                msg:"no blogs present"
            })
        }

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
                        id:true,
                        name:true,
                        punchline:true
                    }
                }
            }
        })

        if(!blog){
            c.status(422)
            return c.json({
                msg:"incorrect blog id"
            })
        }
    
        return c.json({
            blog
        });
    
    
    }catch(e){
        console.log(e);
        c.status(411);
        return c.text("error while fetching blog post");
    }
})




