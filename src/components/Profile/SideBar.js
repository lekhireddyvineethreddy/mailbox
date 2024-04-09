import React from 'react';
import classes from "./SideBar.module.css";
import { AiFillEdit, AiOutlineSend, AiOutlineStar } from "react-icons/ai";
import { BiSolidInbox } from "react-icons/bi";
import { GrDocument } from "react-icons/gr";
import { MdOutlineWatchLater, MdLabelImportantOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { inboxFill } from '../../store/inboxSlice';
import { sentboxFill } from '../../store/sentboxSlice';


const SideBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const inboxEmail = useSelector((state) => state.inbox.inboxEmail);

  const showCompose = () => {
    navigate("/profile/compose", { replace: true })
  }

  const showInbox = () => {
    navigate("/profile/inbox", { replace: true })
    dispatch(inboxFill(auth.userEmail))
  }

  const showSentbox = () => {
    navigate("/profile/sentbox", { replace: true })
    dispatch(sentboxFill(auth.userEmail))
  }

  let totalUnread = 0;
  inboxEmail.forEach((message) => {
    if(message[1].unread){
      totalUnread++;
    }
  })

  return (
    <div className={classes.content}>
      <div className={classes.compose} onClick={showCompose}>
        <AiFillEdit />{" "}
        <p>Compose Mail</p>
      </div>
      <div className={classes.inbox} onClick={showInbox}>
        <BiSolidInbox />{" "}
        <p>Inbox{" "}</p><span>{totalUnread}</span>
      </div>
      <div className={classes.other}>
        <AiOutlineStar />{" "}
        <p>Starred</p>
      </div>
      <div className={classes.other}>
        <MdOutlineWatchLater />{" "}
        <p>Snoozed</p>
      </div>
      <div className={classes.other}>
        <MdLabelImportantOutline />{" "}
        <p>Important</p>
      </div>
      <div className={classes.sent} onClick={showSentbox}>
        <AiOutlineSend />{" "}
        <p>Sent</p>
      </div>
      <div className={classes.other}>
        <GrDocument />{" "}
        <p>Drafts</p>
      </div>
    </div>
  )
}

export default SideBar