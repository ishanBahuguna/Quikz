import React, { useRef, useState } from 'react'

const sleep = async () => {
    return new Promise((resolve) =>{
        setTimeout( () => {
            resolve
        } , 5000)
    })
}

const Demo = () => {
    const ref = useRef(0);
    const [count  , setCoount] = useState(0)
console.log(ref.current)
    async function Increment() {
            await sleep();
        ref.current++;
        setCoount(c => c+1)
        console.log(ref.current)
        
    }
  return (
    <div>
        <h1>{"Count from ref:" + ref.current}</h1>
        <h1>{"Count from state:" + count}</h1>
        <button onClick={Increment} >Increment</button>
    </div>
  )
}

export default Demo;