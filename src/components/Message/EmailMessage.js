import React from 'react';
import classes from "./EmailMessage.module.css";
import { useSelector } from 'react-redux';
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const EmailMessage = () => {
  const message = useSelector((state) => state.inbox.messageOpen);
  console.log(message);

  const navigate = useNavigate();

  const backtoInbox = () => {
    navigate("/profile/inbox", { replace: true })
  }

  return (
    <section className={classes.messageCon}>
      <div className={classes.backIcon} onClick={backtoInbox}>
        <BiArrowBack />
      </div>
      <h1>{message.subject}</h1>
      <section className={classes.msgMain}>
        <div className={classes.msgContent}>
          <span className={classes.info}>
            <BsPersonCircle className={classes.infopic} />
            <p> {message.from}</p>
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

export default EmailMessage