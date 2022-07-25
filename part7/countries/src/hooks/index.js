import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const api_key = process.env.REACT_APP_API_KEY

  const [country, setCountry] = useState({
    name: '',
    capital: '',
    area: '',
    flag: ''
  })
  const [weather, setWeather] = useState({
    loaded: false,
    temp: '',
    icon: '',
    windSpeed: ''
  })

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => setCountry({
        name: response.data[0].name.common,
        capital: response.data[0].capital[0],
        area: response.data[0].area,
        flag: response.data[0].flags.png,
        languages: Object.values(response.data[0].languages)
      }))

      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${api_key}&units=metric`)
        .then(response => setWeather({
          loaded: true,
          temp: response.data.main.temp,
          icon: response.data.weather[0].icon,
          wind: response.data.wind.speed
        }))    
  }, [name])

  return {
    country,
    weather
  }
}