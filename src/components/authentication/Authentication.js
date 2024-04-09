import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

const Authentication = () => {
    const [showLog , setShowLog] = useState(true);

    const showLogIn = () => {
        setShowLog(true)
    }

    const hideLogIn = () => {
        setShowLog(false)
    }

  return (
    <div>
      {!showLog && <Signup onShow={showLogIn}/>}
      {showLog && <Login onHide={hideLogIn}/>}
    </div>
  )
}

export default Authentication