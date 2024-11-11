import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-center items-center w-full h-20 mt-5">
      <nav>
        <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <li className="border border-blue-600 p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
            <Link to="/">Home</Link>
          </li>

          <li className="border border-blue-600 p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
            <Link to="/orders">Pedidos</Link>
          </li>

          <li className="border border-blue-600 p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
            <Link to="/login">Login</Link>
          </li>

          <li className="border border-white bg-blue-600 text-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-[50px]">
            <Link to="/register">Registrar-se</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
