import { createBrowserRouter } from "react-router-dom";
import { GarixWebsite } from "./app/components/website/GarixWebsite";
import { AboutUs } from "./app/components/website/AboutUs";
import { AdminLayout } from "./app/components/admin/AdminLayout";
import { AdminDashboard } from "./app/components/admin/AdminDashboard";
import { AdminServices } from "./app/components/admin/AdminServices";
import { AdminBookings } from "./app/components/admin/AdminBookings";
import { AdminBlog } from "./app/components/admin/AdminBlog";
import { AdminCustomers } from "./app/components/admin/AdminCustomers";
import { AdminSettings } from "./app/components/admin/AdminSettings";
import { AdminLogin } from "./app/components/admin/AdminLogin";
import { ProtectedRoute } from "./app/components/admin/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GarixWebsite,
  },
  {
    path: "/about",
    Component: AboutUs,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: () => (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "services", Component: AdminServices },
      { path: "bookings", Component: AdminBookings },
      { path: "blog", Component: AdminBlog },
      { path: "customers", Component: AdminCustomers },
      { path: "settings", Component: AdminSettings },
      
    ],
  },
]);
