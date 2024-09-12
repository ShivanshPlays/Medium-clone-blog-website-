import { useParams } from "react-router-dom";
import { Fullblogcard } from "../components/fullblogcard";
import { useBlog } from "../myhooks/useblogs";
import { Appbar } from "../components/appbar";
import { FullBlogCardSkeleton } from "../components/fullblogcardskeleton";

export const Blog = () => {
  const { id } = useParams();

  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div className="bg-slate-600">
        <div>
          <Appbar />
        </div>
        <div>
          <div>
            <FullBlogCardSkeleton></FullBlogCardSkeleton>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-slate-600 h-screen">
        <div>
          <Appbar />
        </div>
        <div className="h-5/6">
          <Fullblogcard
            id={blog?.id||""}
            title={blog?.title || ""}
            content={blog?.content || ""}
            publishdate={blog?.date || ""}
            authorname={blog?.author.name || ""}
            punchline={blog?.author.punchline || ""}
            authorId={blog?.author.id||""}
          ></Fullblogcard>
        </div>
      </div>
    );
  }
};
