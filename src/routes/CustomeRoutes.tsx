import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import NotProtectedRoute from './NotProtectedRoute'
import Login from '../pages/login/Login'
import SignUp from '../pages/signup/signUp'
import Home from '../pages/home/home'
import Dashboard from '../pages/dashboard/dashboard'

const CustomeRoutes = () => {
    useEffect(() => {
        authenticate().then(() => {
            const ele = document.getElementById('progress-indicator')
            if (ele) {
                ele.classList.add('available')
                setTimeout(() => {
                }, 2000)
            }
        })
    }, [])

    const authenticate = () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }
    return (
        <Routes>
            {/* not protected routes */}
            <Route path="/" element={<NotProtectedRoute><Home /></NotProtectedRoute>} />
            <Route path="/login" element={<NotProtectedRoute><Login /></NotProtectedRoute>} />
            <Route path="/signup" element={<NotProtectedRoute><SignUp /></NotProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotProtectedRoute><Home /></NotProtectedRoute>} />

        </Routes>
    )
}
export default CustomeRoutes