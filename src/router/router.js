import * as React from "react";
import {createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import CartPage from "../views/cart.page";
import App from "../App";
import Categories from "../categories/categories";


export default function Router() {

    const router = createBrowserRouter([
        {
            path:"/",
            element: <App />
        },
        {
            path: "/cart",
            element: <CartPage />
        },
        {
            path:"/categories",
            element:<Categories/>
        }
    
    ])

    return <RouterProvider router={router} />
}