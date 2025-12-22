import { useGSAP } from "@gsap/react"
import gsap from "gsap/all"

function Highlights({imgPath,heading,description}) {
    
    return (
        <div className="highlights md:w-[40%]  md:px-4 md:py-4">
            <img src={imgPath} alt="" className="w-20" />
            <div className="md:mt-3">
                <h3 className="font-bold">{heading}</h3>
                <p className="md:mt-3">{description}</p>
            </div>
        </div>
    )
}

export default Highlights
