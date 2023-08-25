// 메인페이지
import App from "./App";
import MainPage from "./pages/MainPage/MainPage";
import MyPage from "./pages/MyPage/MyPage";
// import EntrancePage from "./pages/WebRtcPage/EntrancePage";
//import WebRTC from "./pages/WebRtcPage/WebRtcPage";
import SuggestionM from "./pages/MyPage/SuggestionM/SuggestionM";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
// 마이페이지
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
// 게시판
import BoardsAll from "./pages/BoardsAll/BoardsAll";
import BoardsView from "./pages/BoardsAll/BoardsView/BoardsView";
import BoardSearchView from "./pages/BoardsAll/BoardSearchView/BoardSearchView";
import PostDetail from "./pages/PostDetail/PostDetail";
import PostUpdate from "./pages/PostUpdate/PostUpdate";
import SearchView from "./pages/SearchView/SearchView";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
// 회원가입
import Signup from "./pages/SignupPage/Signup";
import Signup0 from "./pages/SignupPage/Signup0";
import Signup1 from "./pages/SignupPage/Signup1";
import Signup2 from "./pages/SignupPage/Signup2";
import Signup3 from "./pages/SignupPage/Signup3";
import EmailVerifyPage from "./pages/EmailVerifyPage/EmailVerifyPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "user",
        element: <MyPage />,
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
        element: <BoardsAll />,
        children: [
          { path: ":boardId", element: <BoardsView /> },
          { path: ":boardId/search/:keyword", element: <BoardSearchView /> },
        ],
      },
      { path: "boards/:boardId/create", element: <CreatePostPage /> },
      { path: "boards/:boardId/:postId", element: <PostDetail /> },
      { path: "boards/:boardId/:postId/update", element: <PostUpdate /> },
      { path: "boards/search/:keyword", element: <SearchView /> },
      //{ path: "web-rtc", element: <EntrancePage /> },
      //{ path: "web-rtc/connect", element: <WebRTC /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "user/advertisement/form", element: <AddAdvPage /> },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
    children: [
      { path: "", element: <Signup0 />},
      { path: "select", element: <Signup1 /> },
      { path: "register", element: <Signup2 /> },
      { path: "complete", element: <Signup3 /> },
    ],
  },
  { path: "user/advertisement/form", element: <AddAdvPage /> },
  { path: "verify", element: <EmailVerifyPage /> },
]);

export default router;
