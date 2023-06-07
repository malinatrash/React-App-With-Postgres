import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const SignInForm = () => {
	const [isDisabled, setIsDisabled] = useState(true)
	const [alertIsHidden, setAlertIsHidden] = useState(true)
	const [name, setName] = useState('')
	const [lastname, setLastname] = useState('')
	const [phone, setPhone] = useState('')

	useEffect(() => {
		name !== '' && lastname !== '' && phone.length === 11
			? setIsDisabled(false)
			: setIsDisabled(true)
	}, [name, lastname, phone])

	async function getPatient() {
		const url = `http://localhost:3001/api/patient?first_name=${name}&last_name=${lastname}&phone_number=${phone}`
		const response = await fetch(url)
		if (!response.ok) {
			setAlertIsHidden(false)
			setTimeout(() => {
				setAlertIsHidden(true)
			}, 1200)
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		return await response.json()
	}

	return (
		<>
			<div
				hidden={alertIsHidden}
				className={`error shake alert alert-danger`}
				role='alert'
			>
				Произошла ошибика входа
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '50px',
				}}
			>
				<h1>Вход</h1>
				<div
					className={'input-wrapper'}
					style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
				>
					<input
						value={name}
						onChange={e => setName(e.target.value)}
						className='form-control'
						type='text'
						placeholder='Имя'
						aria-label='default input example'
					/>
					<input
						value={lastname}
						onChange={e => setLastname(e.target.value)}
						className='form-control'
						type='text'
						placeholder='Фамилия'
						aria-label='default input example'
					/>
					<input
						value={phone}
						onChange={e => setPhone(e.target.value)}
						className='form-control'
						type='text'
						placeholder='Номер телефона'
						aria-label='default input example'
					/>
				</div>
				<button
					onClick={getPatient}
					disabled={isDisabled}
					type='button'
					className='btn btn-light btn-lg'
				>
					Войти
				</button>
				<NavLink to={'/signup'}>
					<button
						type='button'
						className='btn btn-link'
						style={{ color: 'white' }}
					>
						Зарегистрироваться?
					</button>
				</NavLink>
			</div>
		</>
	)
}

export default SignInForm
