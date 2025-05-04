
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/auth/AuthGuard";
import { DbSetup } from "./context/DbSetup";

// Pages
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import Reports from "./pages/admin/Reports";
import Users from "./pages/admin/Users";
import Merchandise from "./pages/admin/Merchandise";
import Analytics from "./pages/admin/Analytics";
import ZoneManagement from "./pages/admin/ZoneManagement";
import ActivityLog from "./pages/admin/ActivityLog";
import AddZone from "./pages/admin/AddZone";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import ClientOrders from "./pages/moderator/ClientOrders";
import DriverAssignment from "./pages/moderator/DriverAssignment";
import ModeratorMerchandise from "./pages/moderator/Merchandise";
import Performance from "./pages/moderator/Performance";
import Settings from "./pages/moderator/Settings";
import ProfilePage from "./pages/moderator/Profile";
import DriverDashboard from "./pages/DriverDashboard";
import AssignedTasks from "./pages/driver/AssignedTasks";
import History from "./pages/driver/History";
import DriverPerformance from "./pages/driver/Performance";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProducts from "./pages/client/ClientProducts";
import StockingOrders from "./pages/client/StockingOrders";
import DestockingOrders from "./pages/client/DestockingOrders";
import OrderStatus from "./pages/client/OrderStatus";
import ClientSettings from "./pages/client/ClientSettings";
import ControllerDashboard from "./pages/ControllerDashboard";
import AssignedInspections from "./pages/controller/AssignedInspections";
import InspectionHistory from "./pages/controller/InspectionHistory";
import PerformanceTracking from "./pages/controller/PerformanceTracking";
import ControllerSettings from "./pages/controller/ControllerSettings";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";
import PageTransition from "./components/layout/PageTransition";
import AdminSettings from "./pages/admin/Settings";
import DriverSettings from "./pages/driver/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <DbSetup />
            <Routes>
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<PageTransition><SignIn /></PageTransition>} />
              <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
              <Route path="/unauthorized" element={<PageTransition><NotAuthorized /></PageTransition>} />
              
              {/* Protected Admin Routes */}
              <Route element={<AuthGuard allowedRoles={['admin']} />}>
                <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
                <Route path="/admin/zones" element={<PageTransition><ZoneManagement /></PageTransition>} />
                <Route path="/admin/zones/new" element={<PageTransition><AddZone /></PageTransition>} />
                <Route path="/admin/reports" element={<PageTransition><Reports /></PageTransition>} />
                <Route path="/admin/users" element={<PageTransition><Users /></PageTransition>} />
                <Route path="/admin/merchandise" element={<PageTransition><Merchandise /></PageTransition>} />
                <Route path="/admin/analytics" element={<PageTransition><Analytics /></PageTransition>} />
                <Route path="/admin/settings" element={<PageTransition><AdminSettings /></PageTransition>} />
                <Route path="/admin/profile" element={<PageTransition><Profile /></PageTransition>} />
                <Route path="/admin/activity" element={<PageTransition><ActivityLog /></PageTransition>} />
              </Route>
              
              {/* Protected Moderator Routes */}
              <Route element={<AuthGuard allowedRoles={['moderator']} />}>
                <Route path="/moderator" element={<PageTransition><ModeratorDashboard /></PageTransition>} />
                <Route path="/moderator/orders" element={<PageTransition><ClientOrders /></PageTransition>} />
                <Route path="/moderator/drivers" element={<PageTransition><DriverAssignment /></PageTransition>} />
                <Route path="/moderator/merchandise" element={<PageTransition><ModeratorMerchandise /></PageTransition>} />
                <Route path="/moderator/performance" element={<PageTransition><Performance /></PageTransition>} />
                <Route path="/moderator/settings" element={<PageTransition><Settings /></PageTransition>} />
                <Route path="/moderator/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
              </Route>
              
              {/* Protected Driver Routes */}
              <Route element={<AuthGuard allowedRoles={['driver']} />}>
                <Route path="/driver" element={<PageTransition><DriverDashboard /></PageTransition>} />
                <Route path="/driver/tasks" element={<PageTransition><AssignedTasks /></PageTransition>} />
                <Route path="/driver/history" element={<PageTransition><History /></PageTransition>} />
                <Route path="/driver/performance" element={<PageTransition><DriverPerformance /></PageTransition>} />
                <Route path="/driver/settings" element={<PageTransition><DriverSettings /></PageTransition>} />
                <Route path="/driver/profile" element={<PageTransition><Profile /></PageTransition>} />
              </Route>
              
              {/* Protected Client Routes */}
              <Route element={<AuthGuard allowedRoles={['client']} />}>
                <Route path="/client" element={<PageTransition><ClientDashboard /></PageTransition>} />
                <Route path="/client/products" element={<PageTransition><ClientProducts /></PageTransition>} />
                <Route path="/client/stocking" element={<PageTransition><StockingOrders /></PageTransition>} />
                <Route path="/client/destocking" element={<PageTransition><DestockingOrders /></PageTransition>} />
                <Route path="/client/status" element={<PageTransition><OrderStatus /></PageTransition>} />
                <Route path="/client/settings" element={<PageTransition><ClientSettings /></PageTransition>} />
                <Route path="/client/profile" element={<PageTransition><Profile /></PageTransition>} />
              </Route>
              
              {/* Protected Controller Routes */}
              <Route element={<AuthGuard allowedRoles={['controller']} />}>
                <Route path="/controller" element={<PageTransition><ControllerDashboard /></PageTransition>} />
                <Route path="/controller/inspections" element={<PageTransition><AssignedInspections /></PageTransition>} />
                <Route path="/controller/history" element={<PageTransition><InspectionHistory /></PageTransition>} />
                <Route path="/controller/performance" element={<PageTransition><PerformanceTracking /></PageTransition>} />
                <Route path="/controller/settings" element={<PageTransition><ControllerSettings /></PageTransition>} />
                <Route path="/controller/profile" element={<PageTransition><Profile /></PageTransition>} />
              </Route>
              
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
