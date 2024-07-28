import Login from './pages/Login'
import Register from './pages/Register'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import { RoutesPathName } from './constants';
import PrivateRoute from './context/PrivateRoute';
import AccountPage from './pages/AccountPage'

const routes = createBrowserRouter([
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
		path: RoutesPathName.ACCOUNT,
		element: (
				<AccountPage/>
		),
	},
	{
		path: RoutesPathName.DASHBOARD_PAGE,
		element: (
			<PrivateRoute />
		),
	}
     ]);

function App() {
  return <RouterProvider router={routes}/>;  
}

export default App
