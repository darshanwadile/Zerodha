import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/Home.jsx"

function App() {
  useEffect(() => {
    // Check for token in URL params (from login redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      // Store token from URL parameter
      localStorage.setItem('token', tokenFromUrl);
      // Clean URL by removing token parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token found
      window.location.href = "http://localhost:5173/login";
      return;
    }
  }, []);

  return (
   <Routes>
        <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App;
