import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import NotFound from "./shared/NotFound";
import Home from "./features/Home/Home";
import { Profile } from "./features/Customers_Profile/Customer_Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
