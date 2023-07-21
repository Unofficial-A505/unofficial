import { createBrowserRouter } from 'react-router-dom';

import Signup from './pages/SignupPage/Signup'
import Signup1 from './pages/SignupPage/Signup1'
import Signup2 from './pages/SignupPage/Signup2'
import Signup3 from './pages/SignupPage/Signup3'

import App from './App';
import MainPage from './pages/MainPage/MainPage'
import MyPage from './pages/MyPage/MyPage'
import BoardsAll from './pages/BoardsAll/BoardsAll'
import PostDetail from './pages/PostDetail/PostDetail'
import CreatePostPage from './pages/CreatePostPage/CreatePostPage'

import MypagePassword from './pages/MyPage/MypagePassword/MypagePassword'
import MypageUser from './pages/MyPage/MypageUser/MypageUser'
import MypageActivity from './pages/MyPage/MypageActivity/MypageActivity'
import MypageAdver from './pages/MyPage/MypageAdver/MypageAdver'

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
    children: [
      { 
        path: '',
        element: <Signup1 />
      },
      { 
        path: 'register',
        element: <Signup2 />
      },
      { 
        path: 'complete',
        element: <Signup3 />
      },
    ]
  },
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <MainPage />},
      { 
        // path: ':userId', 
        path: 'user', 
        element: <MyPage />,
        children: [
          { index: true, element: <MypageUser />},
          { path: 'password', element: <MypagePassword />},
          { path: 'activity', element: <MypageActivity />},
          { path: 'advertisement', element: <MypageAdver />},
        ]
      },
      { 
        // path: 'board/:boardName',
        path: 'board', element: <BoardsAll />
      },
      { 
        // path: 'board/:boardName/create',
        path: 'board/create', element: <CreatePostPage />
      },
      { 
        // path: 'board/:boardName/:postId',
        path: 'post', element: <PostDetail />
      },
    ]
  }
])

export default router;