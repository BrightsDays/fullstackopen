const CountriesList = ({ countries, onClick }) => {
    const list = countries.map(item => {
        return (
            <li key={`ct_${item.ccn3}`}>
                <span style={{width: 'max-content'}}>{item.name.common}</span> 
                <button 
                  onClick={onClick}
                >show</button>
            </li>
        )
    })

    return <ul>{list}</ul>
}

export default CountriesList