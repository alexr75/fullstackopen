import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
const openweathermap_key = import.meta.env.VITE_OPENWEATHERMAP_KEY

const Filter = ({ value , onChange }) => <p>Find countries: <input type="text" value={value} onChange={(e) => onChange(e.target.value)}/></p>

const Countries = ({ countries, onSelect }) => {
  return countries.map((country) => 
    <p key={country.name.common}>{country.name.common} 
      <button onClick={() => {onSelect(country.name.common)}}>show</button>
    </p>
  )
}
const Weather = ({ weather }) => {
  if (weather) return (
    <>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
      <p>Wind {weather.wind.speed} m/s</p>
    </> 
  )
}
const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      {country.capital && <p>Capital: {country.capital[0]}</p>}
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />
    </>
  )
}

const Content = ({ countries, weather, onSelect }) => {
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 0) return <p>No matches found</p>
  if (countries.length === 1) return (
    <> 
      <Country country={countries[0]}/>
      <Weather weather={weather}/>
    </>
  )
  return (<Countries countries={countries} onSelect={onSelect}/>)
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(null)
  const weatherLocation = useRef('')
  const filtered = countries.filter( country => country.name.common.toLowerCase().includes(filter.toLowerCase()) )
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  useEffect(() => {
    if (filtered.length === 1) {
      const location = filtered[0].capital ? filtered[0].capital[0] : filtered[0].name.common
      if (weatherLocation.current !== location) {
        weatherLocation.current = location
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation.current}&units=metric&appid=${openweathermap_key}`)
          .then(response => {setWeather(response.data)})
          .catch(error => {setWeather(null)})
      }
    } else {
      setWeather(null)
      weatherLocation.current = '';
    }
  }, [filter])

  return (
    <div>
      <Filter value={filter} onChange={(value) => {setFilter(value)}}/>
      {filter && <Content countries={filtered} weather={weather} onSelect={(country) => setFilter(country)}/>}
    </div>
  )
}

export default App