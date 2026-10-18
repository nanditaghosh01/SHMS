import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { RoomsPage } from './pages/public/RoomsPage';
import { RoomDetailsPage } from './pages/public/RoomDetailsPage';
import { AiRecommendationsPage } from './pages/public/AiRecommendationsPage';
import { MyBookingsPage } from './pages/public/MyBookingsPage';
import { GuestServicesPage } from './pages/public/GuestServicesPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { HelpPage } from './pages/public/HelpPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import { BookingConfirmationPage } from './pages/public/BookingConfirmationPage';
import { QrPassPage } from './pages/public/QrPassPage';
import { ProfilePage } from './pages/public/ProfilePage';

// Dashboards
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { ReceptionistDashboard } from './pages/dashboards/ReceptionistDashboard';
import { HousekeepingDashboard } from './pages/dashboards/HousekeepingDashboard';
import { ManagerDashboard } from './pages/dashboards/ManagerDashboard';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HotelProvider>
          <NotificationProvider>
            <Routes>
              {/* Public Application Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/rooms/:id" element={<RoomDetailsPage />} />
                <Route path="/ai-recommendations" element={<AiRecommendationsPage />} />
                <Route path="/my-bookings" element={<MyBookingsPage />} />
                <Route path="/services" element={<GuestServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/booking/checkout" element={<CheckoutPage />} />
                <Route path="/booking/confirmation/:id" element={<BookingConfirmationPage />} />
                <Route path="/qr-pass/:id" element={<QrPassPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Staff & Operations Dashboards */}
              <Route path="/dashboard/admin/*" element={<DashboardLayout currentRoleTitle="Administrator" />}>
                <Route path="*" element={<AdminDashboard />} />
              </Route>

              <Route path="/dashboard/receptionist/*" element={<DashboardLayout currentRoleTitle="Receptionist" />}>
                <Route path="*" element={<ReceptionistDashboard />} />
              </Route>

              <Route path="/dashboard/housekeeping/*" element={<DashboardLayout currentRoleTitle="Housekeeping" />}>
                <Route path="*" element={<HousekeepingDashboard />} />
              </Route>

              <Route path="/dashboard/manager/*" element={<DashboardLayout currentRoleTitle="General Manager" />}>
                <Route path="*" element={<ManagerDashboard />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NotificationProvider>
        </HotelProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
