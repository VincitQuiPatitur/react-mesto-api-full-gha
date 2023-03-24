function AuthorizationForm(props) {
    return (
        <form onSubmit={props.handleSubmit} className="registration__form">
            <h3 className="registration__title">{props.title}</h3>
            <fieldset className="registration__fieldset">
                <label className="registration__label">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={props.userData.email || ''}
                        onChange={props.handleChange}
                        className="registration__input"
                    />
                    <span className="registration__input-error email-error"></span>
                </label>
                <label className="registration__label">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={props.userData.password || ''}
                        onChange={props.handleChange}
                        className="registration__input"
                        autoComplete="on"
                    />
                    <span className="registration__input-error password-error"></span>
                </label>
            </fieldset>
            <button className="registration__button" type="submit">{props.buttonText}</button>
        </form>
    );
}

export default AuthorizationForm;