import { Avatar } from "./avatar";
interface BlogCardInput {
    authorname:string,
    publishdate:string,
    title:string,
    content:string,
    punchline:string
}
export const Fullblogcard = ({title,publishdate,content,authorname,punchline}:BlogCardInput) => {
    console.log(title);
  return (
    
    <div className="px-10 py-5 grid grid-cols-12">
        <div className="col-span-8">
            <div>
            <div className="text-4xl font-extrabold">{title}</div>
            <div className="text-gray-500 my-3">Posted on {publishdate}</div>
            <div className="text-sm">{content}</div>
            </div>
        </div>
        <div className="ml-5 col-span-4">
            <div>
            <div className="mb-3 font-medium">
                Author
            </div>
        
            <div className="flex  mb-3">
                <div className="mr-2 flex items-center justify-center">
                    <Avatar name={authorname}></Avatar>
                </div>
                <div className="text-lg font-bold">
                    {authorname}
                </div>
            </div>
            <div>
                {punchline}
            </div>
            
            </div>
        </div>
    </div>
    
  );
};
// flex items-center justify-center