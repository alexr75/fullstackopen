import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/FilterForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .get()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = () => {
    const replace = (id) => {
      personService
        .update(id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewPerson({ name: '', number: '' })
          newMessage({
            text: `Updated phone number for ${returnedPerson.name}`,
            type: 'info'
          })
        })
        .catch(error => {
          newMessage({
            text: error.response.data.error,
            type: 'error'
          })
        })
    }    
    const add = (cleanedPersons) => {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(cleanedPersons.concat(returnedPerson))
          setNewPerson({ name: '', number: '' })
          newMessage({
            text: `Added ${returnedPerson.name}`,
            type: 'info'
          })
        })
        .catch(error => {
          newMessage({
            text: error.response.data.error,
            type: 'error'
          })
        })
    }

    let foundId = ''
    persons.forEach(person => {
      if (person.name === newPerson.name) foundId = person.id
    }) 
    if (!foundId) {
      add(persons)
    } else {
      personService.get(foundId)
        .then(() => {
          let message=`${newPerson.name} is already added to phonebook, replace the old number with a new one?`
          if(confirm(message)) replace(foundId)
        })
        .catch(() => {
          console.log(newPerson.name, 'not found on server ')
          add(persons.filter(n => n.id !== foundId))
        })
    }
  }

  const newMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const onDelete = (person) => {
    personService
      .remove(person.id)
      .then(() => {
        console.log(person.name, 'removed from server')
      })
      .catch(error => {
        console.log(error)
        newMessage({
          text: `${person.name} has already been removed from server`,
          type: 'error'
        })
      })
      .finally(() => {
        setPersons(persons.filter(n => n.id !== person.id))
      })
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={(value) => setFilter(value)} />
      <h2>Add a contact</h2>
      <PersonForm onSubmit={addPerson} newPerson={newPerson} setNewPerson={setNewPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={onDelete}/>
    </div>
    
  )
}

export default App
