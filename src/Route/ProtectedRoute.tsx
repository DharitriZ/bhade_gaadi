import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import LoginPage from '../Component/LoginPage'
import Dashboard from '../Component/Dashboard'
import UserRequest from '../Component/UserRequest'
import OtpPage from '../Component/OtpPage'

function ProtectedRoute() {
    return (
        <div className="appdiv">
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/User-requests" element={<UserRequest />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/otp" element={<OtpPage />} />
            </Routes>
        </div>

    )
}

export default ProtectedRoute
