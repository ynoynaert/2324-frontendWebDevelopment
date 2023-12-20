import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme , ColorModeScript } from "@chakra-ui/react";

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import AddOrEditVinyl from "./pages/vinyls/AddOrEditVinyl";
import CollectionList from "./pages/collections/CollectionList";
import InfoVinyl from "./pages/vinyls/InfoVinyl";
import AllVinyls from "./pages/vinyls/AllVinyls";
import AddOrEditCollection from "./pages/collections/AddOrEditCollection";

import { AuthProvider } from "./contexts/Auth.context.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Logout from "./pages/Logout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EditUser from "./pages/users/EditUser.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: <PrivateRoute />,
        children: [
          {
            path: "edit",
            element: <EditUser />,
          },
        ],
      },
      {
        path: "/vinyl",
        element: <PrivateRoute />,
        children: [
          {
            path: "all",
            element: <AllVinyls />,
          },
          {
            path: "add",
            element: <AddOrEditVinyl />,
          },
          {
            path: "edit/:id",
            element: <AddOrEditVinyl />,
          },
          {
            path: ":id",
            element: <InfoVinyl />,
          },
        ],
      },
      {
        path: "/collection",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <CollectionList />,
          },
          {
            path: "add",
            element: <AddOrEditCollection />,
          },
          {
            path: "edit/:id",
            element: <AddOrEditCollection />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // or 'light'
    useSystemColorMode: false,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
);
