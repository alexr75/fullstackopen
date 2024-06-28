
const Person = ( { person, onDelete } ) => {
	return (
	  <p>
		{person.name} {person.number} <button onClick={onDelete}>delete</button>
	  </p>
	)
  }
  
  const Persons = ( { persons, filter, onDelete } ) => {
	const filtered = persons.filter( person => person.name.toLowerCase().includes(filter.toLowerCase()) )
	return (
	  <>{ filtered.map( person => <Person key={person.id} person={person} onDelete={() => {onDelete(person)}} /> ) }</>
	)
  }

export default Persons