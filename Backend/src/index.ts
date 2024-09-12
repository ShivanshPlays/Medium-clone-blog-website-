import { Hono } from 'hono'
import { userRouter } from './routes/userRouter';
import { blogRouter } from './routes/blogRouter';
import { cors } from 'hono/cors'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string

	}
}>();

app.use('/*', cors())
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);



export default app


// DATABASE_URL_1 = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTcwYjc5ZTgtYWExNC00YzQ0LWIwZmEtMDY3OWZhOThiMDJkIiwidGVuYW50X2lkIjoiNTIxYzgwOTJmMDExOWJkMWQwMjBlODg1NzEzYzU4NWU3MzgzMmJmMzQ1ZTg1NWZjMDk5MmFhZmJhMDE1NzBmNCIsImludGVybmFsX3NlY3JldCI6ImM4ZWY1N2I2LTdhNWYtNGE3NC1hYzA3LTE2MjNlNWY1M2ZjZiJ9.GbkXXDbTbXOCMDdpESUUp2FNL_xnuuhMfuIZvo4yh5M"