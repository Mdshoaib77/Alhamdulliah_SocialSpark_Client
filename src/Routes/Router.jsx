import { createBrowserRouter } from "react-router";
import RootLayout from "../Pages/RootLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import AddIssues from "../Pages/AddIssues/AddIssues";
import AllIssues from "../Pages/AllIssues/AllIssues";
import MyContribution from "../Pages/MyContribution/MyContribution";
import MyIssues from "../Pages/MyIssues/MyIssues";
import PrivateRoute from "./PrivateRoute";
import Loader from "../Components/Loader";
import IssueDetails from "../Components/IssueDetails";
import EditIssuses from "../Components/EditIssues";
import PageNotFound from "../Components/PageNotFound";
import JoinedEvents from "../Pages/JoinedEvents/JoinedEvent"; // Import the new page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    hydrateFallbackElement: <Loader></Loader>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/all-issues",
        element: <AllIssues></AllIssues>,
      },
      {
        path: "/add-issues",
        element: <PrivateRoute><AddIssues></AddIssues></PrivateRoute>,
      },
      {
        path: "/edit-issue/:id",
        element: <PrivateRoute><EditIssuses></EditIssuses></PrivateRoute>,
        loader: ({params}) => fetch(`https://b12-assignment-10-server.vercel.app/issues/${params.id}`)
      },
      {
        path: "/my-contribution",
        element: <PrivateRoute><MyContribution></MyContribution></PrivateRoute>,
      },
      {
        path: "/my-issues",
        element: <PrivateRoute><MyIssues></MyIssues></PrivateRoute>,
      },
      {
        path: "/issues/:id",
        element: <PrivateRoute><IssueDetails></IssueDetails></PrivateRoute>,
        loader: ({params}) => fetch(`https://b12-assignment-10-server.vercel.app/issues/${params.id}`)
      },
      {
        path: "/joined-events", // New route for Joined Events
        element: <PrivateRoute><JoinedEvents></JoinedEvents></PrivateRoute>,
      },
    ],
  },
]);
