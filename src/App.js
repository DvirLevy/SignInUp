import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ForgotPassword from './Components/ForgotPassword';
import { Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage';
import ProtectedRoutes from './Components/ProtectedRoutes';
function App() {

  return (
    <div className="App">
      <Routes>
        
        <Route exact path="/" element={<SignIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/ResetPassword" element={<ForgotPassword/>} />
        
        <Route element= {<ProtectedRoutes />}>
          <Route path="/MainPage" element = {<MainPage />} />
        </Route>
        
      </Routes>
    </div>
    
  );
}

export default App;