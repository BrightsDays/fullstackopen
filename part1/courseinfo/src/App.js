const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ name, number }) => <p>{name} {number}</p>

const Content = ({ parts }) => {
  const list = parts.map((item, index) => {
    return (
      <Part 
        key={`con_${index}`}
        name={item.name} 
        number={item.exercises} 
      />
    )
  })

  return (
    <div>
      {list}
    </div>
  )
}

const Total = ({ parts }) => {
  let number = 0
  parts.forEach(item => number += item.exercises)

  return (
    <p>Number of exercises {number}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 8
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const { name, parts } = course

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App