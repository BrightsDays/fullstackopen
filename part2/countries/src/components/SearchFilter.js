const SearchFilter = ({ filter, onChange }) => {
    return (
        <div>Find countries:
          <input 
            value={filter}
            onChange={onChange} />
        </div>
    )
}

export default SearchFilter