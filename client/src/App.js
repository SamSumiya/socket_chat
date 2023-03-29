import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SetAvatar } from './pages/SetAvatar';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/chat' element={<Chat />}/> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={<Chat />}/>
        <Route path='/avatar' element={<SetAvatar /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
