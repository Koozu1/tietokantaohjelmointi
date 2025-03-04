import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, cart } = useAppContext();
  console.log(user);

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <div>
        <Link to="/frontpage" className="mr-4">
          Etusivu
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
        {user && <Link to="/logout">Kirjaudu ulos</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
