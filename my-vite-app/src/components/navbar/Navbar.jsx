import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          MiApp
        </Link>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/example1">EjemploMixing</Link>
          <Link to="/example2">EjemploMixing2</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
