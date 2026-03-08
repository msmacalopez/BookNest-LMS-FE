import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginUserAction } from "./features/auth/authAction.js";
import ProtectedRendering from "./components/ProtectedRendering.jsx";

// Toastify:
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

// imported components:
import LibNavBar from "./components/LibNavBar.jsx";
import Footer from "./components/Footer.jsx";

//imported Layout/;
import DashboardLayout from "./layouts/DashboardLayout.jsx";
// public pages:
import HomePage from "./pages/public/HomePage.jsx";
import AllBooksPage from "./pages/public/AllBooksPage.jsx";
import BookDetailPage from "./pages/public/BookDetailPage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import SignupPage from "./pages/public/SignupPage.jsx";
import CheckEmailPage from "./pages/public/CheckEmailPage.jsx";
import VerifyEmailPage from "./pages/public/VerifyEmailPage.jsx";
// private pages:
import MemberDashboard from "./pages/private-member/MemberDashboard.jsx";
import MyBorrowsBooksPage from "./pages/private-member/MyBorrowsBooksPage.jsx";
import ProfilePage from "./pages/private-member/ProfilePage.jsx";
import MyReviews from "./pages/private-member/MyReviews.jsx";
import MyHolds from "./pages/private-member/MyHolds.jsx";
// admin pages:
import AdminDashboard from "./pages/private-admin/AdminDashboard.jsx";
import BookManagementPage from "./pages/private-admin/BookManagementPage.jsx";
import HoldsManagement from "./pages/private-admin/HoldsManagement.jsx";
import BorrowManagementPage from "./pages/private-admin/BorrowManagementPage.jsx";
import ReviewManagementPage from "./pages/private-admin/ReviewManagementPage.jsx";
import AddEditBookPage from "./pages/private-admin/AddEditBookPage.jsx";
import MembersManagementPage from "./pages/private-admin/MembersManagementPage.jsx";
import BorrowsResultOfSearch from "./pages/private-admin/BorrowsResultOfSearch.jsx";
//Super Admin pages:
import ManageAdmins from "./pages/private-system/ManageAdmins.jsx";
import AddEditUserByAdmin from "./pages/private-system/AddEditUserByAdmin.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginUserAction());
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <LibNavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/allbooks" element={<AllBooksPage />} />
            <Route path="/bookdetails" element={<BookDetailPage />} />
            <Route path="/check-email" element={<CheckEmailPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            {/* private routes */}
            {/* all logged-in users */}
            <Route element={<ProtectedRendering />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                {/* member routes */}
                <Route
                  element={
                    <ProtectedRendering
                      allowedRoles={["member", "admin", "superadmin"]}
                      requireActive={true}
                    />
                  }
                >
                  <Route index element={<MemberDashboard />} />
                  <Route path="myborrows" element={<MyBorrowsBooksPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="myreviews" element={<MyReviews />} />
                  <Route path="myholds" element={<MyHolds />} />
                </Route>

                {/* admin routes */}
                <Route
                  element={
                    <ProtectedRendering
                      allowedRoles={["admin", "superadmin"]}
                      requireActive={true}
                    />
                  }
                >
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="books" element={<BookManagementPage />} />
                  <Route path="holds" element={<HoldsManagement />} />
                  <Route path="borrows" element={<BorrowManagementPage />} />
                  <Route path="reviews" element={<ReviewManagementPage />} />
                  <Route path="members" element={<MembersManagementPage />} />
                  <Route path="books/new" element={<AddEditBookPage />} />
                  <Route path="books/:id/edit" element={<AddEditBookPage />} />
                  <Route
                    path="borrows/resultborrows"
                    element={<BorrowsResultOfSearch />}
                  />
                </Route>

                {/* superadmin routes */}
                <Route
                  element={
                    <ProtectedRendering
                      allowedRoles={["superadmin"]}
                      requireActive={true}
                    />
                  }
                >
                  <Route path="admins" element={<ManageAdmins />} />
                  <Route path="users/new" element={<AddEditUserByAdmin />} />
                  <Route
                    path="users/:id/edit"
                    element={<AddEditUserByAdmin />}
                  />
                </Route>
              </Route>
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
