import React, {useState} from "react";
import AuthorizationForm from "./AuthorizationForm";
import InfoTooltip from "./InfoTooltip";

function Login(props) {
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
        if (!userData.email || !userData.password) {
            return;
        }
        props.handleLogin(userData)
            .then(() => {
                setUserData({email: '', password: ''});
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div className="registration">
                <AuthorizationForm
                    title={'Вход'}
                    buttonText={'Войти'}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    userData={userData}
                />
            </div>
            <InfoTooltip
                isOpen={props.isOpen}
                onClose={props.onClose}
                isRegisterOk={props.isRegisterOk}
            />
        </>
    );
}

export default Login;