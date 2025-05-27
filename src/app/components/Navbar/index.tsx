import Image from 'next/image';
import logo from '../../assets/images/logo-fiap.svg';
import style from './navbar.module.scss';

const Navbar = () => (
  <nav className={style.navbar}>
    <Image src={logo} alt="FIAP" className={style.logo} priority />
  </nav>
);

export default Navbar;
