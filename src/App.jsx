import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import {Navbar} from "./components";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import { AboutPage, AuthPage, NotFound, ProductDetail, StoreDetail } from "./pages";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
            <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <AuthPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <AuthPage />
            </IsAnon>
          }
        />

        <Route
          path="/store/:id/detail"
          element={
            
              <StoreDetail />
           
          }
        />
        <Route
          path="/product/:id/detail"
          element={
            
              <ProductDetail />
           
          }
        />

        <Route
          path="/about"
          element={
            
              <AboutPage />
           
          }
        />



        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
