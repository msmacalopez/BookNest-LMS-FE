import { useState } from "react";
import "./App.css";

// Toastify:
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Route, Routes } from "react-router-dom";

// imported components:
import LibNavBar from "./components/LibNavBar.jsx";
import Footer from "./components/Footer.jsx";

//imported pages/;
import HomePage from "./pages/public/HomePage.jsx";
import BookDetailPage from "./pages/public/BookDetailPage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import SignupPage from "./pages/public/SignupPage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./pages/private/DashboardHome.jsx";
import BorrowedBooksPage from "./pages/private/BorrowedBooksPage.jsx";
import ProfilePage from "./pages/private/ProfilePage.jsx";
import BookManagementPage from "./pages/private/BookManagementPage.jsx";
import BorrowManagementPage from "./pages/private/BorrowManagementPage.jsx";
import ReviewManagementPage from "./pages/private/ReviewManagementPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LibNavBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* private routes */}
          {/* <Route
            path="/dashboard"
            element={<DashboardLayout userRole={userRole} />}
          >
            <Route index element={<DashboardHome />} />
            <Route path="borrowed" element={<BorrowedBooksPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="books" element={<BookManagementPage />} />
            <Route path="borrows" element={<BorrowManagementPage />} />
            <Route path="reviews" element={<ReviewManagementPage />} />
          </Route> */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="borrowed" element={<BorrowedBooksPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="books" element={<BookManagementPage />} />
            <Route path="borrows" element={<BorrowManagementPage />} />
            <Route path="reviews" element={<ReviewManagementPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
