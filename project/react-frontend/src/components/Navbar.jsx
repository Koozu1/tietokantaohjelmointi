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
    <nav className="p-2 bg-blue-500 text-white flex justify-between max-w-[800px] mx-auto rounded-lg">
      <div>
        <Link to="/frontpage" className="mr-4 hover:cursor-pointer">
          Etusivu
        </Link>
        <Link to="/search" className="mr-4 hover:cursor-pointer">
          Haku
        </Link>
        {user?.isAdmin && (
        <Link to="/additem" className="mr-4 hover:cursor-pointer">
          Lisää teos
        </Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/order" className="mr-4 hover:cursor-pointer">
        Ostoskori ({cart.size})
        </Link>
        {user ? (
          <>
            <span>Tervetuloa, {user.name}</span>
            <button onClick={handleLogout} className="mr-4 hover:cursor-pointer">
              Kirjaudu ulos
            </button>
          </>
        ) : (
          <Link to="/login">Kirjaudu</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
