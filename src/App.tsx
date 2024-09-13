import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignForm from "./components/SignForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { TState } from "./redux/store";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const token = useSelector((state: TState) => state.user.token);
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route
          index
          element={
            <ProtectedRoute
              children={<Home />}
              link="/login"
              token={Boolean(token)}
            />
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute
              children={<LoginForm />}
              link="/"
              token={Boolean(!token)}
            />
          }
        />
        <Route path="signup" element={<SignForm />} />
        <Route path="profile" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;
