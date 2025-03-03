import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, cart } = useAppContext();

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/search">Haku</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/cart">Ostoskori ({cart.length})</Link>
        {user ? (
          <span>Tervetuloa, {user.name}</span>
        ) : (
          <Link to="/login">Kirjaudu</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
