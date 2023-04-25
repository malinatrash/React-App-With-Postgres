import React, { useState, useEffect } from 'react'

const App = () => {
	const [patients, setpatients] = useState([])
	useEffect(() => {
		getpatient()
	}, [])
	function getpatient() {
		fetch('http://localhost:3001')
			.then(response => {
				return response.text()
			})
			.then(data => {
				setpatients(JSON.parse(data))
			})
	}

	function createpatient() {
		let first_name = prompt('Enter patient first name')
		let last_name = prompt('Enter patient last name')
		let phone_number = prompt('Enter patient phone')
		fetch('http://localhost:3001/patients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ first_name, last_name, phone_number }),
		})
			.then(response => {
				return response.text()
			})
			.then(data => {
				alert(data)
				getpatient()
			})
	}

	function deletepatient() {
		let id = prompt('Enter patient id')
		fetch(`http://localhost:3001/patients/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				return response.text()
			})
			.then(data => {
				alert(data)
				getpatient()
			})
	}

	return (
		<div>
			<button onClick={() => createpatient()}>Добавить пациента</button>
			<button onClick={() => deletepatient()}>Удалить пациента</button>
			{patients.map(p => (
				<div
					key={p.id}
					style={{ display: 'flex', flexDirection: 'row' }}
				>
					<h1>{p.first_name}</h1>
					<h1>{p.last_name}</h1>
				</div>
			))}
		</div>
	)
}
export default App
