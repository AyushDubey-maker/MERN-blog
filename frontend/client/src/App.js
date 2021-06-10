import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Blogs from "./blogs/Blogs";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import axios from "axios";
import EditBlog from "./blogs/EditBlog";
import HomePage from "./components/HomePage";
import BlogForm from "./blogs/BlogForm";
import BlogLandingPage from "./blogs/BlogLandingPage";
// For saving the auth token as cookies.
axios.defaults.withCredentials = true;
function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          {loggedIn === false && (
            <>
              <Route path="/register">
                <Register />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/home">
                <HomePage />
              </Route>
            </>
          )}
          {loggedIn === true && (
            <>
              <Route path="/viewblog/:id">
                <BlogLandingPage />
              </Route>
              <Route path="/edit/:id">
                <EditBlog />
              </Route>
              <Route path="/addblog">
                <BlogForm />
              </Route>
              <Route path="/blog">
                <Blogs />
              </Route>
              <Route path="/home">
                <HomePage />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
