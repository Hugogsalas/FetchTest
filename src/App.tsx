import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/login/component';
import Home from './views/home/component';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <Home />,
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/react-vite-gh-pages/' }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
