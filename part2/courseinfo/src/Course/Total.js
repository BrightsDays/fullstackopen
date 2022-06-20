const Total = ({ parts }) => {
    const total = parts.reduce((a, b) => a + b.exercises, 0)

    return (
      <b>Total number of exercises: {total}</b>
    )
}

export default Total