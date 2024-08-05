import { useParams } from "react-router-dom";
import { Fullblogcard } from "../components/fullblogcard";
import { useBlog } from "../myhooks/useblogs";
import { Appbar } from "../components/appbar";
import { FullBlogCardSkeleton } from "../components/fullblogcardskeleton";

export const Blog = () => {

  const { id } = useParams();

  const { loading, blog } = useBlog({id:id||""});

  if(loading){
    return <div>
                <div>
                    <Appbar/>
                </div>
                <div>
                    <div>
                        <FullBlogCardSkeleton></FullBlogCardSkeleton>
                    </div>
                </div>
                
        </div>
    }else{
        return <div>
                <div>
                    <Appbar/>
                </div>
                <div>
                    <Fullblogcard 
                        title={blog?.title||""} 
                        content={blog?.content||""} 
                        publishdate={blog?.date||""} 
                        authorname={blog?.author.name||""}
                        punchline={blog?.author.punchline||""}
                    ></Fullblogcard>
                </div>
        </div>
    }
    
};
