import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Networks from "./pages/networks/Networks";
import Network from "./pages/network/Network";
//import Machine from "./pages/machine/Machine";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

//import DataRelease from "./components/dataRelease/DataRelease";

import "./styles/global.scss";
import NetworksPage from "./pages/test/test";
import MachinePage from "./pages/machine/Machine";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        {/* <div> */}
        <Footer />
        {/* </div> */}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Networks /> },
        { path: "/network/:id", element: <Network /> },
        { path: "/network/:id/machine/:machineId", element: <MachinePage /> },
        { path: "/test", element: <NetworksPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
