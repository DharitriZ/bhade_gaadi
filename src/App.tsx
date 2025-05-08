import './App.css';
import LoginPage from './Component/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OtpPage from './Component/OtpPage';
import ProtectedRoute from './Route/ProtectedRoute';

function App() {
  return <ProtectedRoute />;
}

export default App;
