import React from "react";
import headerLogo from "../images/header-logo.svg";
import {Link, useLocation} from "react-router-dom";

function Header(props) {
    const location = useLocation();

    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип в виде надписи Mesto Russia" className="header__logo"/>
            <div className="header__links">
                {props.loggedIn &&
                    <div onClick={props.onClick} id='burger_button'
                         className={`header__menu ${props.isActive ? `header__menu_active` : null}`}>
                        <span></span>
                    </div>

                }
                {location.pathname === '/sign-up' && (
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>
                )}
                {location.pathname === '/sign-in' && (
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>
                )}
                {props.loggedIn && (
                    <div className="header__info">
                        <p className="header__mail">{props.email}</p>
                        <Link to="/" onClick={props.signOut} className="header__link">
                            Выйти
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;