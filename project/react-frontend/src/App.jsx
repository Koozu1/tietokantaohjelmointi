import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Frontpage from "./pages/Frontpage";
import LisaaTeos from "./pages/LisaaTeos";
import Search from "./pages/Search";
import Order from "./pages/Order";
import Layout from "./components/Layout";
import { AppProvider } from "./context/AppContext";

const App = () => (
  <AppProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/frontpage" element={<Frontpage />} />
          <Route path="/lisaaTeos" element={<LisaaTeos />} />
          <Route path="/search" element={<Search />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Layout>
    </Router>
  </AppProvider>
);

export default App;
