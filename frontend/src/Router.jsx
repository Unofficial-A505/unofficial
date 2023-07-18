import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Signup from './pages/SignupPage/Signup'
import Signup1 from './pages/SignupPage/Signup1'
import Signup2 from './pages/SignupPage/Signup2'
import Signup3 from './pages/SignupPage/Signup3'

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
      { path: 'complete',
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