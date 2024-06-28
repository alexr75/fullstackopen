
const PersonForm = ({ onSubmit, newPerson, setNewPerson }) => {

	const onFormSubmit = (e) => {
		e.preventDefault()
		onSubmit()
	}
	return (
		<form onSubmit={onFormSubmit}>
		<div>
			<p>name: 
			<input 
				value={newPerson.name} 
				onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
			/>
			</p>
			<p>number: 
			<input 
				value={newPerson.number}
				onChange={(e) => setNewPerson({...newPerson, number:e.target.value})}
			/>
			</p>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
		</form>
	)
}

export default PersonForm