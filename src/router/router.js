import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "../views/cart.page";
import App from "../App";
import Categories from "../views/categories";
import CategoryPage from "../views/category";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/categories/:category",
      element: <CategoryPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
