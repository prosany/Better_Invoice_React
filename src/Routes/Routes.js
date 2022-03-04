import ForgetPassword from "../Pages/Authentications/ForgetPassword";
import Login from "../Pages/Authentications/Login";
import Registration from "../Pages/Authentications/Registration";
import VerifyAccount from "../Pages/Authentications/VerifyAccount";
import ApplyMasterCoupon from "../Pages/Private/ApplyMasterCoupon";
import GenerateInvoice from "../Pages/Private/GenerateInvoice";
import Home from "../Pages/Private/Home";
import Profile from "../Pages/Private/Profile";
import RegenerateInvoice from "../Pages/Private/RegenerateInvoice";
import Plans from "../Pages/Public/Plans";
import Error from "../Pages/Public/Error";

const publicRoute = [
  { path: "/login", component: Login },
  { path: "/registration", component: Registration },
  { path: "/forget-password", component: ForgetPassword },
  { path: "/verify-account", component: VerifyAccount },
  { path: "/plans", component: Plans },
];

const privateRoute = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile },
  { path: "/generate-invoice", component: GenerateInvoice },
  { path: "/regenerate-invoice", component: RegenerateInvoice },
  { path: "/apply-master-coupon", component: ApplyMasterCoupon },
];

const errorRoute = [{ path: "*", component: Error }];

export { publicRoute, privateRoute, errorRoute };
