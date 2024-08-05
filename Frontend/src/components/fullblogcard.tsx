import { Blog } from "../myhooks/useblogs";
import { Avatar } from "./avatar";

export const Fullblogcard = ({
//   title = "Taxing Laughter: The Joke Tax Chronicles",
  date = "August 24,2023",
//   content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   name = "Jokester",
  authordescription = "Master of myth, purveyor of puns, and the funniest person in the seven kingdoms",
Blog
}:Blog) => {
  return (
    
    <div className="px-10 py-5 grid grid-cols-12">
        <div className="col-span-8">
            <div>
            <div className="text-4xl font-extrabold">{Blog.title}</div>
            <div className="text-gray-500 my-3">Posted on {date}</div>
            <div className="text-sm">{Blog.content}</div>
            </div>
        </div>
        <div className="ml-5 col-span-4">
            <div>
            <div className="mb-3 font-medium">
                Author
            </div>
        
            <div className="flex  mb-3">
                <div className="mr-2 flex items-center justify-center">
                    <Avatar name={Blog.author.name}></Avatar>
                </div>
                <div className="text-lg font-bold">
                    {Blog.author.name}
                </div>
            </div>
            <div>
                {authordescription}
            </div>
            
            </div>
        </div>
    </div>
    
  );
};
// flex items-center justify-center