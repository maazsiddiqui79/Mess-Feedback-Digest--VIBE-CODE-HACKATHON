import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentLayout from './components/layout/StudentLayout';
import ManagerLayout from './components/layout/ManagerLayout';
import Login from './pages/auth/Login';
import FeedbackForm from './pages/student/FeedbackForm';
import CommunityChat from './pages/student/CommunityChat';
import StudentProfile from './pages/student/StudentProfile';
import ProfileList from './pages/student/ProfileList';
import Dashboard from './pages/manager/Dashboard';

import Reports from './pages/manager/Reports';
import MenuManager from './pages/manager/MenuManager';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/common/NotFound';

// Mock components for foundation setup


import LandingPage from './pages/common/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route 
          path="/student" 
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FeedbackForm />} />
          <Route path="community" element={<CommunityChat />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="profiles" element={<ProfileList />} />
        </Route>

        {/* Manager Routes */}
        <Route 
          path="/manager" 
          element={
            <ProtectedRoute allowedRoles={['MANAGER', 'ADMIN', 'SUPER_ADMIN']}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="reports" element={<Reports />} />
          <Route path="menu" element={<MenuManager />} />
        </Route>

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
