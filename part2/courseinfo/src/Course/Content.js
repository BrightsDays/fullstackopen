const Content = ({ parts }) => {
    const list = parts.map((item, index) => {
      return (
        <p key={`con_${index}`}>{item.name}: {item.exercises}</p>
      )
    })
  
    return (
      <div>
        {list}
      </div>
    )
}

export default Content