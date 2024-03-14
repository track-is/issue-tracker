import AppRoutes from "./core/routes";

import viteLogo from "/vite.svg";
import "./App.css";
import { Suspense, useEffect } from "react";
import Navbar from "./pages/core/Navbar";
import Spinner from "./components/Spinner";
import { Toaster } from "sonner";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="app">
        <div className="flex justify-between items-center border-b-2">
          <a className="flex items-center space-x-2" href="/">
            <img src={viteLogo} className="logo" alt="Vite logo" width={16} />
            <span className="logo-name">trackus</span>
          </a>
          <Navbar />
        </div>
        <div className="mt-2 main-div">
          <Suspense fallback={<Spinner />}>
            <Toaster richColors position="top-right" />
            <AppRoutes isLoggedIn={false} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
