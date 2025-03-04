import '../comps_styles/appStyles.css'
import { useState, useEffect } from "react";



function TopMenu(){
    const [sideMenu, setOpenMenu] = useState(false);

    const toggleMenu = ()=>{
            setOpenMenu(!sideMenu);
    }

    useEffect(()=>{
        const handleOutClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!target.closest('.side-menu') && !target.closest('.btn-toggle')){
                setOpenMenu(false)
            }
        }

        if (sideMenu){
            document.addEventListener('click', handleOutClick);
        }

        return ()=>{
            document.removeEventListener('click', handleOutClick)
        }
    },[sideMenu])

    return (
        <>
            <div className="top-menu">
                <div className="logo__menu">
                    <i className="fa-solid fa-basketball"></i>
                    <p>HooperStats</p>
                </div>
                <div className='btn-toggle' onClick={toggleMenu}>
                    <i className={`fa-solid ${sideMenu ? "fa-xmark" : "fa-bars"}`}></i>
                </div>
            </div>

            <div className={`side-menu ${sideMenu ? "toggleSMenu" : ""}`}>
                <ul className="side-menu__items">
                    <li>
                        <a href="/"> 
                            Home
                            <i className="fa-solid fa-house"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/profile" >
                            Perfil
                            <i className="fa-solid fa-user"></i>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            Configs.
                            <i className="fa-solid fa-gear"></i>
                        </a>
                    </li>
                    <li className='get-prime'>
                        <a href="">
                            PRIME
                            <i className="fa-solid fa-crown"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default TopMenu;