import { MDXProvider } from '@mdx-js/react';
import Nav from './Nav';
import HeaderBanner from '../mdx/headerBanner.mdx';
import Link from 'next/link';
import LogoType from '../../public/asset/logotype.svg';
import LogoTypeInvert from '../../public/asset/logotype-invert.svg';

const Header = ({ categories }) => (
  <header className="l_flex header_wrap">
    <MDXProvider>
      <HeaderBanner />
    </MDXProvider>
    <div className="l_flex l_in header">
      <Link href="/">
        <a className="l_flex header_brand">
          <img src={LogoType} className="header_logotype" decoding="async" alt="listfulのロゴ" />
          <img src={LogoTypeInvert} className="header_logotype__invert" decoding="async" alt="listfulのロゴ" />
        </a>
      </Link>
      <Nav categories={categories} />
    </div>
  </header>
);

export default Header;
