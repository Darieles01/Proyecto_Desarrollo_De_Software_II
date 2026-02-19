import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import NotFound from "./shared/NotFound";
import Home from "./features/Home/Home";
import { Profile } from "./features/Home/Profile/Profile";
import { PetProfile } from "./features/Home/PetProfile/PetProfile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pets/:id" element={<PetProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
