import "./components/css/app.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import Invoice from "./components/Invoice";
import Menu from "./components/Menu";
import TodaySpecial from "./components/TodaySpecial";
import Register from "./components/Register";
import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/UseReducer";
import AdminRegister from "./components/AdminRegister";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import AdminTodaySpecial from "./components/AdminTodaySpecial";
import OuterMenu from "./components/OuterMenu";
import OuetrTodaySpecial from "./components/OuterTodaySpecial";
import AdminUserAccess from "./components/AdminUserAccess";
import AdminDashboard from "./components/AdminDashboard";
import AdminMenuEdit from "./components/AdminMenuEdit";
import AdminTodaySpecialEdit from "./components/AdminTodaySpecialEdit";
import Navigation from "./components/Navigation";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      //outer today special
      <Route path="/TodaySpecial">
        <Navigation link="special" />
        <OuetrTodaySpecial />
      </Route>
      //outer menu
      <Route path="/Menu">
        <Navigation link="menu" />
        <OuterMenu />
      </Route>
      //admin register
      <Route path="/Adminregister">
        <AdminRegister />
      </Route>
      //admin login
      <Route path="/Adminlogin">
        <AdminLogin />
      </Route>
      //admin dashboard
      <Route path="/Admindashboard">
        <AdminDashboard />
      </Route>
      //admin tables
      <Route path="/AdminUserAccess">
        <Navigation link="admintable" />
        <AdminUserAccess />
      </Route>
      //admin menu edit
      <Route path="/AdminMenuEdit">
        <Navigation link="adminmenuedit" />
        <AdminMenuEdit />
      </Route>
      //admin todays special edit
      <Route path="/AdminTodaySpecialEdit">
        <Navigation link="adminspecialedit" />
        <AdminTodaySpecialEdit />
      </Route>
      //admin add menu
      <Route path="/Adminhome">
        <Navigation link="adminmenuadd" />
        <AdminHome />
      </Route>
      //admin add todays special
      <Route path="/Admintodayspecial">
        <Navigation link="adminspecialadd" />
        <AdminTodaySpecial />
      </Route>
      //user register
      <Route path="/Register">
        <Register />
      </Route>
      //user cart
      <Route path="/Home/Cart">
        <Navigation link="cart" />
        <Cart />
      </Route>
      //user invoice
      <Route path="/Home/Invoice">
        <Navigation link="invoice" />
        <Invoice />
      </Route>
      //user menu
      <Route path="/Home/Menu">
        <Navigation link="homemenu" />
        <Menu />
      </Route>
      //user todays special
      <Route path="/Home/TodaySpecial">
        <Navigation link="homespecial" />
        <TodaySpecial />
      </Route>
      //outer menu
      <Route exact path="/">
        <Navigation link="menu" />
        <OuterMenu />
      </Route>
      //user home
      <Route path="/Home">
        <Home />
      </Route>
      //error page
      <Route path="/">
        <ErrorPage />
      </Route>
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
