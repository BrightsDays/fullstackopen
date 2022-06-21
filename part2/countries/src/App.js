import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './components/CountryInfo'
import SearchFilter from './components/SearchFilter'
import CountriesList from './components/CountriesList'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const filteredList = response.data.filter((item) => {
          return item.name.common.toUpperCase().includes(filter.toUpperCase())
        })
        setCountries(filteredList)
      })
  }, [filter])

  const showCountry = (event) => setFilter(event.target.parentNode.firstChild.textContent)

  return (
    <div>
      <SearchFilter
        filter={filter}
        onChange={(event) => setFilter(event.target.value)} 
      />
      {countries.length > 10 && 
        <p>Too many matches, specifyanother filter</p>}
      {(countries.length <= 10 && countries.length > 1) && 
        <CountriesList 
          countries={countries} 
          onClick={(event) => showCountry(event)}
        />}
      {countries.length === 1 && 
        <CountryInfo country={countries[0]} />}
    </div>
  );
}

export default App;
