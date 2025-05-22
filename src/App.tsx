import "./App.css";
import LoginPage from "./Component/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OtpPage from "./Component/OtpPage";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarTypes from "./Component/CarTypes";
import ProtectedRoute from "./Component/ProtectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, useAppSelector } from "./store";
import DashboardLayout from "./Component/Layout/DashboardLayout";
import { ReviewDocuments } from "./Component/Documents";
import RejectedDocuments from "./Component/RejectedDocuments";
import ApprovedDocuments from "./Component/ApprovedDocuments";
import Dashboard from "./Component/Dashboard";

const App: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth.user);

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
                    <Dashboard />
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
            <Route
              path="/rejected-documents"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <RejectedDocuments />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/approved-documents"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ApprovedDocuments />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Conditional redirect from root */}
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
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
