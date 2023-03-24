import {Link} from "react-router-dom";


function BurgerMenu(props) {

    return (
        <div id='burger_menu' className={`menu${props.isActive ? `_opened` : ``}`}>
            <p className="header__mail">{props.email}</p>
            <Link to="/" onClick={props.signOut} className="header__link">
                Выйти
            </Link>
        </div>
    );
}

export default BurgerMenu;