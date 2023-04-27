import React from 'react';
import SignInForm from "./modules/SignInForm";
import SignUpForm from "./modules/SignUpForm";
import './SignForm.css'

const AuthPage = ({child}) => {
    return (

        <div className={'wrapper'}>
            {
                <div className={'auth-form'}>
                    {child}
                </div>
            }
        </div>
    );
};

export default AuthPage;
