import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&APPID=${api_key}&units=metric`)
          .then(response => setWeather(response.data))
    }, [])

    const languages = Object.values(country.languages).map((language, index) => {
        return <li key={`lng_${index}`}>{language}</li>
    })

    return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <b>Languages:</b>
          <ul>
            {languages}
          </ul>
          <img 
            src={country.flags.png} 
            alt='flag'
            style={{border: '1px solid lightgrey'}} 
          />
          {
            weather &&
            <div>
              <h3>Weather in {country.capital[0]}</h3>
              <p>Temperature: {weather.main.temp} Celcius</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt='weather' />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          } 
        </div>
    )
}

export default CountryInfo