import Home from "views/Pages/Home";
import Login from "views/Pages/Login";

// @material-ui/icons



var dashRoutes = [
  {
    path: "/home",
        name: "Home",
        mini: "PP",
        rtlMini: "ع",
        component: Home,
        layout: "/main"
  },
  {
    path: "/login",
        name: "login",
        mini: "RG",
        rtlMini: "ع",
        component: Login,
        layout: "/main"
  }
];
export default dashRoutes;
