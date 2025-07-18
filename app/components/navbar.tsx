import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="font-bold text-2xl text-gradient">RESUMIND</p>
      </Link>
      <Link className="primary-button w-fit" to="/upload">
        Upload Resume
      </Link>
    </nav>
  );
};
