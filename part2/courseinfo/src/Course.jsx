const Header = ({course}) => <h1>{course}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
      <div>
        {parts.map(part => <Part part={part} key={part.id}/>)}
      </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course