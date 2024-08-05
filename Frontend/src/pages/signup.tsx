import { Signupform } from "../components/signupform"
import { Quote } from "../components/quote"

export const Signup = ()=>{
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
            <Signupform></Signupform>
        </div>
        <div className="invisible md:visible">
            <Quote></Quote>
        </div>
    </div>
}