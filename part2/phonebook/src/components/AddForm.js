const AddForm = ({ newName, newNumber, onChangeName, onChangeNumber, onSubmit, alert}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
            <div>name: 
                <input 
                value={newName}
                onChange={onChangeName} />
            </div>
            <div>number: 
                <input 
                value={newNumber} 
                onChange={onChangeNumber} />
            </div>
            {alert && <p>{newName} already added in phonebook</p>}
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddForm