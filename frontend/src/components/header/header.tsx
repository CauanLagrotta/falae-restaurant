import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "@mui/icons-material/Logout";
import Axios from "axios";
import { HeaderProps } from "@/types/types";

export function Header({
  onStaffStatus,
  staff,
}: HeaderProps & { staff: number }) {
  const [auth, setAuth] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3000/api/auth/header")
      .then((res) => {
        if (res.data.msg === "Autenticação bem-sucedida") {
          setAuth(true);
          onStaffStatus(res.data.user.staff);
        } else {
          setAuth(false);
          onStaffStatus(0);
        }
      })
      .catch((err) => console.log(err));
  }, [onStaffStatus]);

  const handleLogout = () => {
    Axios.get("http://localhost:3000/api/auth/logout").then(() => {
      location.reload();
    });
  };

  return (
    <header className="flex justify-center items-center w-full h-20 mt-5">
      <nav>
        <ul className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <li className="border border-blue-600 p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
            <Link to="/">Home</Link>
          </li>

          {auth && staff === 1 && (
            <li className="border border-blue-600 p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
              <Link to="/orders">Pedidos</Link>
            </li>
          )}

          {auth && staff === 0 && (
            <li className="border border-blue-600 p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
              <Link to="/myorders">Meus pedidos</Link>
            </li>
          )}

          {auth ? (
            <>
              <Logout
                className="text-blue-600 cursor-pointer w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <li className="border border-blue-600 p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
                <Link to="/login">Login</Link>
              </li>
              <li className="border border-white bg-blue-600 text-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
                <Link to="/register">Registrar-se</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
