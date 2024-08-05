import { Quote } from "../components/quote"
import { Signinform } from "../components/signinform"

export const Signin = ()=>{
    return <div className="grid grid-cols-1 md:grid-cols-2">
    <div>
        <Signinform></Signinform>
    </div>
    <div className="invisible md:visible">
        <Quote></Quote>
    </div>
</div>
}