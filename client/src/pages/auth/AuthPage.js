import React from 'react';
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
