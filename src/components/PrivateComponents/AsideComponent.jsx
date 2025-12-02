import { NavLink } from "react-router-dom";

function AsideComponent({ linkTo, imgAddress, linkLabel }) {
  return (
    <div>
      <NavLink
        to={linkTo}
        className={({
          isActive,
        }) => `flex items-center justify-start gap-5 px-2 py-2 rounded-lg transition-colors hover:bg-gray-200
                    ${
                      isActive
                        ? "active-NavLink"
                        : "text-black "
                    }`}
      >
        <img src={imgAddress} alt="" className="w-10" />
        <span className="text-[1.2rem]">{linkLabel}</span>
      </NavLink>
    </div>
  );
}

export default AsideComponent;
