import { AddBlog } from "../pages/AddBlog";
import { Ask } from "../pages/Ask";
import LoginModal from "../pages/auth/Login";
import Home from "../pages/home";
import { Home1 } from "../pages/home1";
import Item from "../pages/Item";
import Like from "../pages/Like";
import { Profile } from "../pages/Profile";
import { Save } from "../pages/Saved";
import { Settings } from "../pages/Settings";
import { Topics } from "../pages/Topics";

export const routes = [
  { path: "/home", component: <Home1 /> },
  { path: "/", component: <Home /> },
  { path: "/topics", component: <Topics /> },
  { path: "/like", component: <Like /> },
  { path: "/saved", component: <Save /> },
  { path: "/ask", component: <Ask /> },
  { path: "/addblog", component: <AddBlog /> },
  { path: "/profile", component: <Profile /> },
  { path: "/settings", component: <Settings /> },
  { path: "/items/:id", component: <Item /> },
  { path: "/login", component: <LoginModal /> },
];
