import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/home.tsx";
import { Login } from "../pages/login/login.tsx";
import { Register } from "../pages/register/register.tsx";
import { MyOrders } from "../pages/myorders/myorders.tsx";
import { Orders } from "../pages/orders/orders.tsx";
import { ForgotPassword } from "../pages/forgot-password/forgot-password.tsx";
import { ResetPassword } from "../pages/reset-password/reset-password.tsx";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/api/auth/reset-password/:userid/:token" element={<ResetPassword />} />
        </Routes>
    )
}