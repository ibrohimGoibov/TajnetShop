import Layout from './layout/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/state/home/home'
import About from './page/state/about/about'
import Product from './page/state/productPage/product'
import LogIn from './page/state/accountPage/logIn'
import Register from './page/state/accountPage/register'
import Error from './store/api/errorApi/error'
import ProductById from './page/state/productPage/productById'
import CategoriesById from './page/state/categoryPage/categoriesById'
import Cart from './page/state/cartPage/cart'
import Task from './page/state/task/task'
import SubCategories from './page/state/subCategoriesPage/subCategories'


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
        },
        {
          path: 'error',
          element: <Error />
        },
        {
          path: 'productById/:id',
          element: <ProductById />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'categories/:id',
          element: <CategoriesById />
        },
        {
          path: 'categories/:id/subcategories',
          element: <SubCategories />
        },
        {
          path: 'task',
          element: <Task />
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