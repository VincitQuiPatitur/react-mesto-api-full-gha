import React, {useState} from "react";
import AuthorizationForm from "./AuthorizationForm";
import {Link} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Register(props) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegister(userData);
    }

    return (
        <>
            <div className="registration">
                <AuthorizationForm
                    title={'Регистрация'}
                    buttonText={'Зарегистрироваться'}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    userData={userData}
                    isRegisterOk={props.isRegisterOk}
                />
                <Link to='/sign-in' className="registration__authorization-link">Уже зарегистрированы? Войти</Link>
            </div>
            <InfoTooltip
                isOpen={props.isOpen}
                onClose={props.onClose}
                isRegisterOk={props.isRegisterOk}
            />
        </>
    );
}

export default Register;