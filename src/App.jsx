import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileUpdatePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
