import {Component} from "react";
import {FaUserCircle} from "react-icons/fa";

function Logo() {
  return (
    <svg className="size-[60px] fill-none" viewBox="0 0 100 100" role="img" aria-label="Charter logo">
    <path d="M85.5 44C85.5 66.9198 66.9198 85.5 44 85.5C21.0802 85.5 2.5 66.9198 2.5 44C2.5 21.0802 21.0802 2.5 44 2.5C66.9198 2.5 85.5 21.0802 85.5 44Z" strokeWidth="5" stroke="#98D3DF"/>
    <path d="M47.5828 2.37915V63.6418H7.28435L47.5828 2.37915Z" fill="#98D3DF"/>
    <path d="M61.8574 27.3601V58.8836H83.8643L61.8574 27.3601Z" fill="#98D3DF"/>
    <path d="M61.8574 7.13745V58.8835H26.7652L61.8574 7.13745Z" fill="#EFEFEF"/>
    <path d="M11.3009 69.5895H55.9096V83.8643L11.3009 69.5895Z" fill="#EFEFEF"/>
    <path d="M76.7269 69.5895H55.9096V83.8643L76.7269 69.5895Z" fill="#EFEFEF"/>

    </svg>
  );
}

class Header extends Component {
    render() {
        return ( 
      <header className="relative flex h-16 items-center justify-between bg-linear-to-r from-blue-950 to-blue-500 px-2.5 shadow-md">
        <a href="/" className="flex" aria-label="Charter home">
          <Logo />
        </a>

        <h1 className="absolute left-1/2 -translate-x-1/2 font-title text-2xl font-medium text-white">
          Charter
        </h1>

        <button className={"button icon-button fill-primary dropdown h-10"}>
            <FaUserCircle></FaUserCircle>
            <div className={"dropdown-content right-0"}>
                <a href={"/login"}>
                    Prijava
                </a>
                <a href={"/signup"}>
                    Registracija
                </a>
            </div>
        </button>
      </header>
        )
    }
}

export default Header;