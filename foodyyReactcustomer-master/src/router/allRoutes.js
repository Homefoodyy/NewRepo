import AboutUs from "../pages/AboutUs";
import Addresses from "../pages/ACCOUNT/Addresses";
import Orders from "../pages/ACCOUNT/Orders";
import Profile from "../pages/ACCOUNT/Profile";
import BecomeAChef from "../pages/BecomeAChef";
import BecomeADelivery from "../pages/BecomeADelivery";
import Checkout from "../pages/Checkout";
import HomePage from "../pages/HomePage";
import KitchenDetails from "../pages/KitchenDetails";
import LandingPage from "../pages/LandingPage";
import PaymentInfo from "../pages/PaymentInfo";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const protectedRoutes = [
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/payment-info/:id",
    component: PaymentInfo,
  },
  {
    path: "/account/profile",
    component: Profile,
  },
  {
    path: "/account/orders",
    component: Orders,
  },
  {
    path: "/account/addresses",
    component: Addresses,
  },
];

const publicRoutes = [
  { path: "/", component: LandingPage },
  { path: "/home", component: HomePage },
  { path: "/become-a-chef", component: BecomeAChef },
  { path: "/join-as-a-delivery-partner", component: BecomeADelivery },
  { path: "/about-us", component: AboutUs },
  { path: "/kitchen-details/:id", component: KitchenDetails },

  { path: "/signin", component: Signin },
  { path: "/signup", component: Signup },
];

export { protectedRoutes, publicRoutes };
