import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },

    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <nav className='flex justify-between items-center py-6'>
        <a href='/' className='text-3xl font-bold italic '>
          CarrerCanvas
        </a>

        {/* nav items for learge device */}
        <ul className='hidden md:flex gap-10'>
          {navItems.map(({ path, title }) => (
            <li key={path} className='text-primary text-base font-medium'>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* signup and login btn */}
        <div className='font-medium space-x-5 hidden lg:block'>
          <Link
            to='/Login'
            className='py-2 px-5 border rounded bg-blue text-white'
          >
            Login
          </Link>
        </div>

        {/* mobile menu */}
        <div className='md:hidden block'>
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className='w-5 h-5 text-primary' />
            ) : (
              <FaBarsStaggered className='w-5 h-5 text-primary' />
            )}
          </button>
        </div>
      </nav>

      {/* navitem for mobile */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className='text-white text-base font-medium py-1'>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "active" : "text-white"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
          <Link
            to='/Login'
            className='py-2 px-5 text-white  my-2 inline-block  rounded bg-blue'
          >
            Login
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
