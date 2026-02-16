import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import NotFound from "./shared/NotFound";
import Home from "./features/home";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col w-full">
        <Header />

        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
