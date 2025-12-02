import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainLayout from "./components/Layouts/MainLayout";
import LandingPage from "./components/LandingPage";
import PricingPage from "./components/PricingPage";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgetPassword from "./components/ForgetPassword";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { handleEmailService } from "./services/emailJsService";
import Dashboard from "./components/PrivateComponents/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import ConfirmMail from "./components/ConfirmMail";
import ProtectedRoute from "../ProtectedRoute";
import ResetPassword from "./components/Reset-Password";
import PasswordResetMessage from "./components/PasswordResetMessage";
import ProtectedResetRoute from "./components/ProtectedResetRoute";
import Transactions from "./components/PrivateComponents/Transactions";
import Sales from "./components/PrivateComponents/Sales";
import Inventory from "./components/PrivateComponents/Inventory";
import Settings from "./components/PrivateComponents/Settings";

import Managment from "./components/PrivateComponents/Managment";
import { addProductAction } from "./Business-Logic/Managment/addProductAction";
import { loadProductsData } from "./Business-Logic/Managment/productLoder";
//import ProtectedResetRoute from "./components/ProtectedResetRoute";

function App() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const routes = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/pricing",
          element: <PricingPage />,
        },
        {
          path: "/about",
          element: <About />,
          action: handleEmailService,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/confirm-email",
          element:<ConfirmMail />,
        },
        {
          path: "/reset-password",
          element:<ProtectedResetRoute><ResetPassword /></ProtectedResetRoute>
        },
        {
          path: "/passwordreset-message",
          element:<PasswordResetMessage />,
        },
      ],

      errorElement: <NotFound />,
    },
    {
      path:'/dashboard',
      element:<ProtectedRoute><Dashboard /></ProtectedRoute>
    },
    {
      path:'/transactions',
      element:<ProtectedRoute><Transactions /></ProtectedRoute>
    },{
      path:'/sales',
      element:<ProtectedRoute><Sales/></ProtectedRoute>
    },{
      path:'/inventory',
      element:<ProtectedRoute><Inventory /></ProtectedRoute>
    },{
      path:'/settings',
      element:<ProtectedRoute><Settings /></ProtectedRoute>
    },{
      path:'/managment',
      element:<ProtectedRoute><Managment /></ProtectedRoute>,
      action:addProductAction,
      loader:loadProductsData
    },
    
  ]);

  return (
    <div className="w-full">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
