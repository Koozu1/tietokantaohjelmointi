import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, cart, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <div>
        <Link to="/frontpage" className="mr-4">
          Etusivu
        </Link>
        <Link to="/search">Haku</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/order">Ostoskori ({cart.size})</Link>
        {user ? (
          <>
            <span>Tervetuloa, {user.name}</span>
            <button onClick={handleLogout}>Kirjaudu ulos</button>
          </>
        ) : (
          <Link to="/login">Kirjaudu</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
