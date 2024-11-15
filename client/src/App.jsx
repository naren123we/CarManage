import { Suspense, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

import Website from "./pages/Website";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext";
import Favourites from "./pages/Favourites/Favourites";
import Loginsigup from "./pages/login/login";

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    email: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user")).email
      : "",
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    favourites: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user")).favResidenciesID
      : [],
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/login" element={<Loginsigup />} />
                <Route path="/cars">
                  <Route index element={<Properties />} />
                  <Route path=":carId" element={<Property />} />
                </Route>
                <Route path="/favourites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
