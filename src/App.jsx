import './App.css'
import Die from './components/Die'
import React from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [dieType, setDieType] = React.useState(true)
  const [rolls, setRolls] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(33333);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue)
    const someHeld = dice.some(die => die.isHeld)

    if(someHeld){
      setRunning(true)
    }

    if(allHeld && allValue){
      setTenzies(true)
      setRunning(false)
      let currentTime = time
      if(currentTime < bestTime){
        setBestTime(currentTime)
        localStorage.setItem("tenziesBestTime", JSON.stringify(currentTime))
      }
    }
  },[dice, time, bestTime])

  React.useEffect(() => {
    let interval;
    if(running){
      interval = setInterval(() => {
        setTime(prev => prev + 10)
      })
    }
    else if(!running){
      clearInterval(interval)
    }
    return() => clearInterval(interval)
  },[running])

  React.useEffect(() => {
    const bestTime = JSON.parse(localStorage.getItem("tenziesBestTime"));
    if(bestTime){
      setBestTime(bestTime)
    }
  }, [])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i=1;i<=10;i++)
    {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function rollDice(){
    if(!tenzies){
      setRolls(prev => prev + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
    else{
      setRolls(0)
      setTenzies(false)
      setDice(allNewDice())
      setTime(0)
    }
  }

  function diceType(){
    setDieType(prev => !prev)
  }

  const diceElements = dice.map(die => <Die type={dieType ? 'num' : 'dice'} isHeld={die.isHeld} key={die.id} value={die.value} holdDice={() => holdDice(die.id)}/>)

  return (
    <main className='App'>
      {tenzies && <Confetti width={1500} height={650}/>}  
      <h1 className='die-title'>Tenzies</h1>
      <p className='die-info'>Roll until all dies are the same. Click each die to freeze it at its current value between rolls. Click the button below to toggle between numbers and real dice.</p>
      <div className='die-type-div'>
        <button onClick={diceType} className='die-type'>{dieType ? 'Num' : 'Dice'}</button>
      </div>
      <div className='dies-grid'>
        {diceElements}
      </div>
      <div className='dies-timer'>
        <div className='dies-timer-time'>
          <h3 className='dies-timer-title'>Current Time</h3>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>  
        <div className='dies-timer-time'>
          <h3 className='dies-timer-title'>Best Time</h3>
          <span>{("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
        </div>
      </div>
      <p className='rolls'>No. of Rolls: {rolls}</p>
      <button onClick={rollDice} className='die-roll'>{tenzies ? 'New Game' : 'Roll'}</button>
      <p className='die-footer'>&nbsp;MRJ 2023. All Rights Reserved.&nbsp;</p>
    </main>
  )
}

export default App
