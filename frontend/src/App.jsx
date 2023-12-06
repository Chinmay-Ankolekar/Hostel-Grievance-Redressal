import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import { RoutesPathName } from './constants';

const router = createBrowserRouter([
	{
		path: RoutesPathName.SIGNUP_PAGE,
		index: true,
		Component: Register,
	},
	{
		path: RoutesPathName.LOGIN_PAGE,
		element: (
				<Login/>
		),
	},
	{
		path: RoutesPathName.DASHBOARD_PAGE,
		element: (
      <Dashboard/>
		),
	}
     ]);

function App() {
  
  return <RouterProvider router={router}/>;
  
 
     {/* <Login/> */}
     {/* <Register/> */}
     {/* <Dashboard/> */}
    
}

export default App
