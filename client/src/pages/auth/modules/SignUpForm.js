import React, {useState} from 'react';
import './Form.css'
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";

const SignUpForm = () => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [alertIsHidden, setAlertIsHidden] = useState(true)
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        name !== "" && lastname !== "" && phone.length === 11
            ? setIsDisabled(false)
            : setIsDisabled(true)
    }, [name, lastname, phone])

    async function createPatient() {
        const data = {
            first_name: name.trim(),
            last_name: lastname.trim(),
            phone_number: phone.trim()
        }

        fetch('http://localhost:3001/api/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(newPatient => {
                console.log(newPatient)

            })
            .catch(error => {
                setAlertIsHidden(false)
                setTimeout(() => {
                    setAlertIsHidden(true)
                }, 1200)
                console.error(error)
            });

    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '50px'
        }}>
            <div hidden={alertIsHidden} className={`error shake alert alert-danger`} role="alert">
                Произошла ошибика регистрации
            </div>
            <h1>Регистрация</h1>
            <div className={'input-wrapper'}
                 style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Имя"
                    aria-label="default input example"
                />
                <input
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Фамилия"
                    aria-label="default input example"
                />
                <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Номер телефона"
                    aria-label="default input example"
                />
            </div>
            <button
                onClick={createPatient}
                disabled={isDisabled}
                type="button"
                className="btn btn-light btn-lg"
            >
                Зарегистрироваться
            </button>
            <button
                type="button"
                className="btn btn-link"
                style={{color: "white"}}
            >
                <NavLink to={'/signin'} style={{color: "white"}}>
                    Уже есть аккаунт?
                </NavLink>
            </button>
        </div>
    );
};

export default SignUpForm;
