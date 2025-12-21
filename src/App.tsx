import React from 'react'
import Layout from './layout/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LogIn from './store/api/accountApi/logIn'
import Register from './store/api/accountApi/register'
import Home from './store/api/pageApi/home'
import About from './store/api/pageApi/about'
import Product from './store/api/categoryApi/product'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'product',
          element: <Product />
        },
        {
          path: 'logIn',
          element: <LogIn />
        },
        {
          path: 'register',
          element: <Register />
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App