import './App.css';
import LoginPage from './Component/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OtpPage from './Component/OtpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
