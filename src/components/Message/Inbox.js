import React from 'react';
import classes from "./Inbox.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoDotFill, GoDot } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { inboxAction } from '../../store/inboxSlice';

const Inbox = () => {
  const inboxEmails = useSelector((state) => state.inbox.inboxEmail);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const clickHandler = async (item) => {
    console.log(item)
    navigate("/profile/inbox/message", { replace: true })
    dispatch(inboxAction.addMessageOpen(item));

    const userEmail = auth.userEmail.replace(/[.@]/g, "");

    try {
      const response = await fetch(`https://mailbox-1027f-default-rtdb.firebaseio.com/${userEmail}/receiveEmail/${item[0]}.json`, {
        method: "PUT",
        body: JSON.stringify({
          date: item[1].date,
          email: item[1].email,
          from: item[1].from,
          id: item[1].id,
          subject: item[1].subject,
          unread: false
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(response.ok){
        console.log("message read succesfully")
      }
    } catch (error) {
      console.log(error)
    }

  }

  const emailDeleteHandler = async (item) => {
    dispatch(inboxAction.removeItem(item));

    const userEmail = auth.userEmail.replace(/[.@]/g, "");

    try {
      const response = await fetch(`https://mailbox-1027f-default-rtdb.firebaseio.com/${userEmail}/receiveEmail/${item[0]}.json`,{
        method : "DELETE"
      })
      if(response.ok){
        console.log("message delete succesfuly!!")
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={classes.inbox}>
      <h1>Inbox</h1>
      <ul className={classes["message-list"]}>
        {inboxEmails.map((message) => (
          <li key={message[0]} className={message[1].unread ? classes.messageUnread : classes.messageRead} onClick={() => clickHandler(message)}>
            <div>{message[1].unread ? (<GoDotFill style={{ color: "blue" }} />) : (<GoDot />)}</div>
            <div className={classes["message-sender"]}>{message[1].from}</div>
            <div className={classes["message-subject"]}>{message[1].subject}</div>
            <div className={classes.date}>{message[1].date}</div>
            <button 
              className={classes.action} 
              onClick={(event) =>
                {event.stopPropagation(); 
                emailDeleteHandler(message)}}>
              <RiDeleteBin6Line />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Inbox