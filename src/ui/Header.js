import { MDXProvider } from '@mdx-js/react';
import Nav from './Nav';
import HeaderBanner from '../mdx/headerBanner.mdx';
import Link from 'next/link';
import LogoType from '../../public/asset/logotype.svg';
import ThemeToggle from './ThemeToggle';

const Header = ({ categories }) => (
  <header className="header_wrap">
    <MDXProvider>
      <HeaderBanner />
    </MDXProvider>
    <div className="l_flex l_in header">
      <Link href="/">
        <a className="l_flex header_brand">
          <img src={LogoType} className="header_logotype" decoding="async" alt="listfulのロゴ" />
        </a>
      </Link>
      <ThemeToggle />
      <Nav categories={categories} />
    </div>
  </header>
);

export default Header;
