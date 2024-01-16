import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate,useLocation } from 'react-router-dom';

const SpinnerContainer = () => {
  const [count,setCount] = useState(5)
  const navigate=useNavigate()
  const location = useLocation()
useEffect(()=>{
const interval=setInterval(()=>{
  setCount(count-1)
},1000)
count===0 && navigate("/login",{state: location.pathname})
return ()=>{clearInterval(interval)}
},[count])
  return (
    <div className='w-100 h-100vh text-center'>
      <h1>redirecting in {count} seconds</h1>
      <Spinner animation="border" role="status" className='mt-5'>
      <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default SpinnerContainer
