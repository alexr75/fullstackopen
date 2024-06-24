import { useState } from 'react'

const Button = ({ handleClick , text }) => (
  <button onClick={handleClick}>{text}</button>
)


const Feedback = ({ addGood, addNeutral, addBad }) => {
  return (
    <div>
      <Button text='good' handleClick={addGood} />
      <Button text='neutral' handleClick={addNeutral} />
      <Button text='bad' handleClick={addBad} />
    </div>
  )
}

const StatisticLine = ({ text , value }) => (
  <tr><th style={{textAlign:'left'}}>{text}</th><td>{value}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad;
  const average = ((good * 1) + (bad * -1)) / all;
  const positive = (good / all) * 100;

  if (good > 0 || neutral > 0 || bad > 0 ) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + '%'} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )

  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Feedback addGood={addGood} addNeutral={addNeutral} addBad={addBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
