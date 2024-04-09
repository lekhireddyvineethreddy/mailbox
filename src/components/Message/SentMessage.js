import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import classes from "./SentMessage.module.css";

const SentMessage = () => {
  const message = useSelector((state) => state.sentbox.sentmessageOpen)

  console.log(message);

  const navigate = useNavigate();

  const backtoSentbox = () => {
    navigate("/profile/sentbox", { replace: true })
  }

  return (
    <section className={classes.messageCon}>
      <div className={classes.backIcon} onClick={backtoSentbox}>
        <BiArrowBack />
      </div>
      <h1>{message.subject}</h1>
      <section className={classes.msgMain}>
        <div className={classes.msgContent}>
          <span className={classes.info}>
            <BsPersonCircle className={classes.infopic} />
            <p> {message.to}</p>
          </span>
          <span className={classes.date}>{message.date}</span>
        </div>
        <div className={classes.messageBox}>
          {message.email}
        </div>
      </section>
    </section>
  )
}

export default SentMessage