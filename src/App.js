import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './components/authentication/Authentication';
import Compose from './components/Message/Compose';
import Inbox from './components/Message/Inbox';
import SentBox from './components/Message/SentBox';
import Root from './components/Root/Root';
import Welcome from './components/Profile/Welcome';
import EmailMessage from './components/Message/EmailMessage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { inboxFill } from './store/inboxSlice';
import { sentboxFill } from './store/sentboxSlice';
import SentMessage from './components/Message/SentMessage';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(inboxFill(localStorage.getItem("email")));
      dispatch(sentboxFill(localStorage.getItem("email")));
    }
  }, [])

  setInterval(() => {
    if (localStorage.getItem("email")) {
      dispatch(inboxFill(localStorage.getItem("email")));
      dispatch(sentboxFill(localStorage.getItem("email")));
      console.log("render");
    }
  }, 90000)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/profile' element={<Root />}>
          <Route path='/profile/welcome' element={<Welcome />} />
          <Route path='/profile/compose' element={<Compose />} />
          <Route path='/profile/inbox' element={<Inbox />} />
          <Route path='/profile/sentbox' element={<SentBox />} />
          <Route path='/profile/inbox/message' element={<EmailMessage />} />
          <Route path='/profile/sentbox/message' element={<SentMessage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;