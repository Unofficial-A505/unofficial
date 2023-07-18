import { createBrowserRouter } from 'react-router-dom';
import Signup from './pages/SignupPage/Signup'
import Signup1 from './pages/SignupPage/Signup1'
import Signup2 from './pages/SignupPage/Signup2'
import Signup3 from './pages/SignupPage/Signup3'
import App from './pages/App';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
    children: [
      { path: '',
        element: <Signup1 />
      },
      { path: 'register',
        element: <Signup2 />
      },
      { path: 'conplete',
        element: <Signup3 />
      },

    ]
  },
  {
    path: '/',
    element: <App />
  }
])

export default router;