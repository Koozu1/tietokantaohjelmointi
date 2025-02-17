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

const App = () => (
  <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/frontpage" element={<Frontpage />} />
      <Route path="/lisaaTeos" element={<LisaaTeos />} /> 
    </Routes>
  </Router>
);

export default App;
