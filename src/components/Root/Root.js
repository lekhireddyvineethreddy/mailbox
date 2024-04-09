import React from 'react'
import Home from '../Profile/Home'
import { Outlet } from 'react-router-dom'
import classes from "./Root.module.css";
import SideBar from '../Profile/SideBar';

const Root = () => {
  return (
    <div>
      <Home/>
      <div className={classes.body}>
        <div className={classes.sidebar}>
          <SideBar />
        </div>
        <div className={classes.content}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Root