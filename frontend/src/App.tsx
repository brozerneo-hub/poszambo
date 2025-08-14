import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SalesPage from "./pages/SalesPage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

export default function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/login" element={<LoginPage/>} />
<Route path="/dashboard" element={<DashboardPage/>} />
<Route path="/sales" element={<SalesPage/>} />
<Route path="*" element={<Navigate to="/login" replace />} />
</Routes>
</BrowserRouter>
);
}