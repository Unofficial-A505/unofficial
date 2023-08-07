import { createBrowserRouter } from "react-router-dom";

import Signup from "./pages/SignupPage/Signup";
import Signup1 from "./pages/SignupPage/Signup1";
import Signup2 from "./pages/SignupPage/Signup2";
import Signup3 from "./pages/SignupPage/Signup3";

import App from "./App";
import MainPage from "./pages/MainPage/MainPage";
import MyPage from "./pages/MyPage/MyPage";

import BoardsAll from "./pages/BoardsAll/BoardsAll";
import BoardsView from "./pages/BoardsAll/BoardsView/BoardsView";
import BoardSearchView from "./pages/BoardsAll/BoardSearchView/BoardSearchView";

import PostDetail from "./pages/PostDetail/PostDetail";
import PostUpdate from "./pages/PostUpdate/PostUpdate";
import SearchView from "./pages/SearchView/SearchView";

import MypageUser from "./pages/MyPage/MypageUser/MypageUser";
import MyChangePassword from "./pages/MyPage/MypageUser/MyChangePassword/MyChangePassword";
import MyDeleteAccount from "./pages/MyPage/MypageUser/MyDeleteAccount/MyDeleteAccount";

import MypageActivity from "./pages/MyPage/MypageActivity/MypageActivity";
import MypostsView from "./pages/MyPage/MypageActivity/MypostsView/MypostsView";
import MyCommentsView from "./pages/MyPage/MypageActivity/MyCommentsView/MyCommentsView";

import MypageAdver from "./pages/MyPage/MypageAdver/MypageAdver";
import MyMileage from "./pages/MyPage/MypageAdver/MyMileage/MyMileage";
import MyAdvertisement from "./pages/MyPage/MypageAdver/MyAdvertisement/MyAdvertisement";

import Management from "./pages/MyPage/Management/Management";
import AddAdvPage from "./pages/MyPage/MypageAdver/AddAdvPage";

import CreatePostPage from "./pages/CreatePostPage/QuillContainer";

import EmailVerifyPage from "./pages/EmailVerifyPage/EmailVerifyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import WebRTC from "./pages/WebRtcPage/WebRtcPage";
import SuggestionM from "./pages/MyPage/SuggestionM/SuggestionM";

const router = createBrowserRouter([
  {
    path: "/web-rtc",
    title: "WebRTC",
    element: <WebRTC />,
  },
  {
    path: "/verify",
    element: <EmailVerifyPage />,
  },
  {
    path: "/signup",
    title: "회원가입",
    element: <Signup />,
    children: [
      {
        path: "",
        element: <Signup1 />,
      },
      {
        path: "register",
        element: <Signup2 />,
      },
      {
        path: "complete",
        element: <Signup3 />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        title: "언오피셜",
        element: <MainPage />,
      },
      {
        path: "user/advertisement/form",
        title: "광고신청",
        element: <AddAdvPage />,
      },
      {
        // path: ':userId',
        path: "user",
        element: <MyPage />,
        title: "마이페이지",
        children: [
          {
            path: "",
            element: <MypageUser />,
            children: [
              { path: "password", element: <MyChangePassword /> },
              { path: "deletion", element: <MyDeleteAccount /> },
            ],
          },
          {
            path: "activity",
            element: <MypageActivity />,
            children: [
              { path: "myposts", element: <MypostsView /> },
              { path: "mycomments", element: <MyCommentsView /> },
            ],
          },
          {
            path: "advertisement",
            element: <MypageAdver />,
            children: [
              { path: "mymile", element: <MyMileage /> },
              { path: "myadv", element: <MyAdvertisement /> },
            ],
          },
          { index: true, element: <MypageUser /> },
          { path: "activity", element: <MypageActivity /> },
          { path: "advertisement", element: <MypageAdver /> },
          { path: "management", element: <Management /> },
          { path: "suggestion", element: <SuggestionM /> },
        ],
      },
      {
        path: "boards",
        title: "게시판",
        element: <BoardsAll />,
        children: [
          { path: ":boardId", element: <BoardsView /> },
          { path: ":boardId/search/:keyword", element: <BoardSearchView /> },
        ],
      },
      { path: "boards/:boardId/:postId", element: <PostDetail /> },
      { path: "boards/search/:keyword", element: <SearchView /> },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
    ],
  },
  { path: "/user/advertisement/form", element: <AddAdvPage /> },
  { path: "boards/:boardId/create", element: <CreatePostPage /> },
  { path: "boards/:boardId/:postId/update", element: <PostUpdate /> },
]);

export default router;
