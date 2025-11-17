import { Link } from "react-router-dom"

function ContactCard({imgPath,name,position,gitLink,xLink}) {
    return (
        <div className="shadow-box rounded-xl w-[20%] flex md:flex-col md:items-center bg-white md:py-10">
            <div className="card-heading w-full flex md:flex-col md:items-center">
                <img src={imgPath} alt="" className="w-20 rounded-full" />
                <h1 className="text-[#344554] font-bold text-2xl mt-5">{name}</h1>
                <p className="text-[#344554] mt-2">{position}</p>
            </div>
            <div className="links flex gap-4 mt-2">
                <Link to={gitLink}>
                    <img src="/images/github.png" alt="" className="w-10" />
                </Link>
                <Link to={xLink}>
                <img src="/images/X.png" alt="" className="w-10" />
                </Link>
            </div>
        </div>
    )
}

export default ContactCard
