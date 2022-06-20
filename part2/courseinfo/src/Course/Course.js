import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
    const { name, parts } = course

    return (
      <div>
        <h2>{name}</h2>
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
}

export default Course