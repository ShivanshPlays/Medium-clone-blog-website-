
export const Avatar=({name,size="small"}:{name:string,size?:"small"|"large"})=>{
    return <div>
        
    <div className= {`relative inline-flex items-center justify-center ${size==="large"?"w-10 h-10":"w-5 h-5"} overflow-hidden bg-gray-100 rounded-full`}>
        <div className={`${size==="large"?"text-xl":"text-xs"}`}>
            {name[0]}
        </div>
        
    </div>


    </div>
}