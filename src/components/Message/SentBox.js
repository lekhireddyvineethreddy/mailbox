import React from 'react'
import classes from "./SentBox.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sentboxAction } from '../../store/sentboxSlice';
import { RiDeleteBin6Line } from "react-icons/ri";

const SentBox = () => {
  const sentboxEmails = useSelector((state) => state.sentbox.sentEmail)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const clickHandler = (item) => {
    console.log(item);
    navigate("/profile/sentbox/message" , {replace:true});
    dispatch(sentboxAction.addMessageOpen(item))
  }

  const emailDeleteHandler = async (item) => {
    dispatch(sentboxAction.removeItem(item));

    const userEmail = auth.userEmail.replace(/[.@]/g, "");

    try {
      const response = await fetch(`https://mailbox-1027f-default-rtdb.firebaseio.com/${userEmail}/sendEmail/${item[0]}.json`,{
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
      <h1>Sentbox</h1>
      <ul className={classes["message-list"]}>
        {sentboxEmails.map((message) => (
          <li key={message[0]} className={classes.message} onClick={() => clickHandler(message)}>
            <div className={classes["message-sender"]}>{message[1].to}</div>
            <div className={classes["message-subject"]}>{message[1].subject}</div>
            <div className={classes.date}>{message[1].date}</div>
            <button
              className={classes.action}
              onClick={(event) => {
                event.stopPropagation();
                emailDeleteHandler(message)
              }}>
              <RiDeleteBin6Line />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SentBox