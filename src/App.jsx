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
import DashboardLayout from "./layouts/DashboardLayout.jsx";
// public pages:
import HomePage from "./pages/public/HomePage.jsx";
import AllBooksPage from "./pages/public/AllBooksPage.jsx";
import BookDetailPage from "./pages/public/BookDetailPage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import SignupPage from "./pages/public/SignupPage.jsx";
// private pages:
import DashboardHome from "./pages/private-any/DashboardHome.jsx";
import MyBorrowsBooksPage from "./pages/private-any/MyBorrowsBooksPage.jsx";
import ProfilePage from "./pages/private-any/ProfilePage.jsx";
// admin pages:
import BookManagementPage from "./pages/private-admin/BookManagementPage.jsx";
import BorrowManagementPage from "./pages/private-admin/BorrowManagementPage.jsx";
import ReviewManagementPage from "./pages/private-admin/ReviewManagementPage.jsx";
//Super Admin pages:
import ManageAdmins from "./pages/private-system/ManageAdmins.jsx";
import AddEditBookPage from "./pages/private-admin/AddEditBookPage.jsx";
import MembersManagementPage from "./pages/private-admin/MembersManagementPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <LibNavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/allbooks" element={<AllBooksPage />} />
            <Route path="/bookdetails" element={<BookDetailPage />} />

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
              {/* Logged In Members */}
              <Route index element={<DashboardHome />} />
              <Route path="myborrows" element={<MyBorrowsBooksPage />} />
              <Route path="profile" element={<ProfilePage />} />

              {/* Admins */}
              <Route path="books" element={<BookManagementPage />} />
              <Route path="borrows" element={<BorrowManagementPage />} />
              <Route path="reviews" element={<ReviewManagementPage />} />
              <Route path="members" element={<MembersManagementPage />} />
              <Route path="editbook/:id" element={<AddEditBookPage />} />
              {/* Super Admins */}
              <Route path="admins" element={<ManageAdmins />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
