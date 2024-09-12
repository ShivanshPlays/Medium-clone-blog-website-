import { Appbar } from "../components/appbar";
import { BlogCard } from "../components/blogcard";
import { useBlogs } from "../myhooks/useblogs";
import { Blogcardskeleton } from "../components/blogcardskeleton";
import { Link } from "react-router-dom";

// interf
export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <div>
          <Appbar />
        </div>
        <div className="flex justify-center items-center flex-col bg-slate-600">
          <div className="w-3/4">
            <Blogcardskeleton></Blogcardskeleton>
            <Blogcardskeleton></Blogcardskeleton>
            <Blogcardskeleton></Blogcardskeleton>
            <Blogcardskeleton></Blogcardskeleton>
            <Blogcardskeleton></Blogcardskeleton>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Appbar />
        </div>
        <div className="flex justify-center items-center flex-col bg-slate-600">
          {blogs.map((blog) => (
            <div className="w-3/4">
              <Link to={`/blog/${blog.id}`}>
                <BlogCard
                  authorname={blog.author.name}
                  publishdate={blog.date}
                  title={blog.title}
                  content={blog.content}
                ></BlogCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
