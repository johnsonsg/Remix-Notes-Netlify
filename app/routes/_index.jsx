// import usestate from react
import { useState } from 'react'

export default function Index() {
  // add useState for button in react
  const [count, setCount] = useState(0)

  // create onClick function for button
  const onClick = () => {
    setCount(count + 1)
  }

  // create button component with onClick function and store to state
  const Button = () => <button onClick={onClick}>Click me</button>

  return (
    // add button component to return

    <div>
      <h1>Index</h1>
      <p>Count: {count}</p>
      <Button />
    </div>
  )
}
