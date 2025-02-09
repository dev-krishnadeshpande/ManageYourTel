import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DashboardPage from "./pages/DashboardPage";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./ui/Layout";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import Signup from "./features/authentication/Signup";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import UploadData from "./features/dummyData/UploadData";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Reception from "./pages/Reception";
import CreateBooking from "./pages/CreateBooking";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />}></Route>
            <Route path="dashboard" element={<DashboardPage />}></Route>
            <Route path="bookings" element={<Bookings />}></Route>
            <Route path="bookings/:bookingId" element={<Booking />}></Route>
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="cabins" element={<Cabins />}></Route>
            <Route path="reception" element={<Reception />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="data" element={<UploadData />}></Route>
            <Route path="onboard" element={<CreateBooking />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
          <Route path="login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
