import "./index.css";
import NavBarZora from "./components/assets/navBarZora";
import Home from "./pages/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/assets/Footer";
import NotFound from "./pages/error/ErrorPage";
import Shop from "./pages/error/shop/Shop";
import ProductDetails from "./pages/error/shop/ProductDetails";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import UserProfile from "./pages/auth/UserProfile";
import Cart from "./pages/auth/Cart";
import GuestRoute from "./components/auth/GuestRoute";
const RootLayout = () => {
  return (
    <>
      <NavBarZora />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,

    children: [
      { index: true, element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetails /> },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      { path: "/UserProfile", element: <UserProfile /> },
      { path: "/Cart", element: <Cart /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
