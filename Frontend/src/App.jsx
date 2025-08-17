// Corrected version without the extra BrowserRouter
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout";
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<CreateNote />} />
            <Route path="/note/:id" element={<NoteDetail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}