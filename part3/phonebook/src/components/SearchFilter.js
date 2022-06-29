const SearchFilter = ({ filter, onChange }) => {
    return (
        <div>filter: 
          <input 
            value={filter}
            onChange={onChange} />
        </div>
    )
}

export default SearchFilter