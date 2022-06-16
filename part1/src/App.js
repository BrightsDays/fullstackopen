const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Content = (props) => {
  const parts = props.parts.map((item, index) => {
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
      {parts}
    </div>
  )
}

const Total = (props) => {
  let number = 0
  props.parts.forEach(item => {
    number += item.exercises
  });

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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App