import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import NotFound from "./shared/NotFound";
import Home from "./features/Home/Home";
import { Profile } from "./features/Customers_Profile/Customer_Profile";
import PetList from "./features/Pets_List/Pet_List";
import { PetProfile } from "./features/Pets_Profile/PetProfile";
import { PetConsultations } from "./features/Pet_Consultations/Pet_Consultations";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        <main className="bg-gray-800 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/pets_consultations/:id" element={<PetConsultations />} />
            <Route path="/pet/:id" element={<PetProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
