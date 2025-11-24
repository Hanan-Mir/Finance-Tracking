import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import MainLayout from "./components/Layouts/MainLayout"
import LandingPage from "./components/LandingPage"
import PricingPage from "./components/PricingPage"
import About from "./components/About"
import NotFound from "./components/NotFound"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import ForgetPassword from "./components/ForgetPassword"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import { handleEmailService } from "./services/emailJsService"
import PrivateLayout from "./components/Layouts/PrivateLayout"
import Dashboard from "./components/PrivateComponents/Dashboard"
import { AuthContextProvider } from "./context/AuthContext"
import ConfirmMail from "./components/ConfirmMail"
import ProtectedRoute from "../ProtectedRoute"
function App() {
    gsap.registerPlugin(ScrollTrigger,SplitText)
    const routes=createBrowserRouter([
        {
           element:<MainLayout />,
           children:[
            {
                path:'/',
                element:<LandingPage />
            },
            {
                path:'/pricing',
                element:<PricingPage />

            },
            {
                path:'/about',
                element:<About />,
                action:handleEmailService
            },{
                path:'/login',
                element:<Login />
            },{
                path:'/signUp',
                element:<SignUp />
            },{
                path:'forget-password',
                element:<ForgetPassword />
            },{
                path:'/confirm-email',
                element:<ConfirmMail />
            }
           ],
         
           errorElement:<NotFound />
        },{
            path:'/dashboard',
            element:<ProtectedRoute />,
            children:[
                {
                    path:'',
                    element:<Dashboard />
                }
            ]
        }
    ])
    
    return (
        <div className="w-full">
         
       <RouterProvider router={routes} />
  
        </div>
    )
}

export default App
