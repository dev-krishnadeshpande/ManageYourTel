import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./ui/Layout";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate replace to="dashboard" />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="bookings" element={<Bookings />}></Route>
            <Route path="cabins" element={<Cabins />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
