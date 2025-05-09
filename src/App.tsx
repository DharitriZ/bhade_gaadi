import './App.css';
import LoginPage from './Component/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OtpPage from './Component/OtpPage';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarTypes from './Component/CarTypes';
import ProtectedRoute from './Component/ProtectedRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import DashboardLayout from './Component/Layout/DashboardLayout';
import { ReviewDocuments } from './Component/Documents';

const App: React.FC = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-otp" element={<OtpPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <div className="p-4">
                      <h1 className="text-2xl font-bold text-[#1E3A8A]">Dashboard</h1>
                      {/* Add your dashboard content here */}
                    </div>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/car-types"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CarTypes />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/review-documents"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ReviewDocuments />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </PersistGate>
  );
};

export default App;
