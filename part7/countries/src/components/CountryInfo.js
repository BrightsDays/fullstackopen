import { useCountry } from '../hooks'

const CountryInfo = ({ countryName }) => {
  const { country, weather } = useCountry(countryName)

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <b>Languages:</b>
      <ul>
        {country.languages && country.languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img 
        src={country.flag} 
        alt='flag'
        style={{border: '1px solid lightgrey'}} 
      />
      {
        weather.loaded &&
        <div>
          <h3>Weather in {country.name}</h3>
          <p>Temperature: {weather.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt='weather' />
          <p>Wind: {weather.wind} m/s</p>
        </div>
      } 
    </div>
  )
}

export default CountryInfo