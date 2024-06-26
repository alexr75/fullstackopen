import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value , onChange }) => {
  return (
    <p>Filter contacts:
      <input value={value} onChange={(e) => onChange(e.target.value)}/>
    </p>
  )
}

const Person = ( { person, onDelete } ) => {
  return (
    <p>
      {person.name}
      {person.number}    
      <button onClick={onDelete}>delete</button>
    </p>
  )
}

const Persons = ( { persons, filter, onDelete } ) => {
  const filtered = persons.filter( person => person.name.toLowerCase().includes(filter.toLowerCase()) )
  return (
    <>{ filtered.map( person => <Person key={person.id} person={person} onDelete={() => {onDelete(person.id)}} /> ) }</>
  )
}

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

const App = () => {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = () => {
    let foundId = ''
    persons.forEach(person => { 
      if (person.name === newPerson.name) foundId = person.id
    })
    if (foundId) {
      let message=`${newPerson.name} is already added to phonebook, replace the old number with a new one`
      if(confirm(message)) {
        personService
          .update(foundId, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== foundId ? person : returnedPerson))
            setNewPerson({ name: '', number: '' })
          })

      }
    } else {    
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewPerson({ name: '', number: '' })
        })
    }
  }

  const onDelete = (id) => {
    personService
      .remove(id)
      .then(data => {
        setPersons(persons.filter(n => n.id !== id))
      })
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(value) => setFilter(value)} />
      <h2>Add a contact</h2>
      <PersonForm onSubmit={addPerson} newPerson={newPerson} setNewPerson={setNewPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={onDelete}/>
    </div>
    
  )
}

export default App
