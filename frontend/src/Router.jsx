import { createBrowserRouter } from 'react-router-dom';

import Signup from './pages/SignupPage/Signup'
import Signup1 from './pages/SignupPage/Signup1'
import Signup2 from './pages/SignupPage/Signup2'
import Signup3 from './pages/SignupPage/Signup3'

import App from './App';
import MainPage from './pages/MainPage/MainPage'
import MyPage from './pages/MyPage/MyPage'

import BoardsAll from './pages/BoardsAll/BoardsAll'
import BoardsView from './pages/BoardsAll/BoardsView/BoardsView'
import BoardSearchView from './pages/BoardsAll/BoardSearchView/BoardSearchView'

import PostDetail from './pages/PostDetail/PostDetail'
// import CreatePostPage from './pages/CreatePostPage/CreatePostPage'
import SearchView from './pages/SearchView/SearchView'

import MypageUser from './pages/MyPage/MypageUser/MypageUser'
import MypageActivity from './pages/MyPage/MypageActivity/MypageActivity'
import MypageAdver from './pages/MyPage/MypageAdver/MypageAdver'
import AddAdvPage from './pages/MyPage/MypageAdver/AddAdvPage'

import CreatePostPage from './pages/CreatePostPage/QuillContainer'
// import CreatePostPage from './pages/CreatePostPage/CreatePost'

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
          { path: 'activity', element: <MypageActivity />},
          { path: 'advertisement', element: <MypageAdver />},
        ]
      },
      { 
        path: 'boards',
        element: <BoardsAll />,
        children: [
          { path: ':boardTitle', element: <BoardsView />},
          { path: ':boardTitle/search/:keyword', element: <BoardSearchView />}
        ]
      },
      { path: 'boards/:boardTitle/create', element: <CreatePostPage /> },
      { path: 'boards/:boardTitle/:postId', element: <PostDetail />,}, 
      { path: 'boards/search/:keyword', element: <SearchView /> },
    ]
  },
  { path: '/user/advertisement/form', 
    element: <AddAdvPage />,}
])

export default router;