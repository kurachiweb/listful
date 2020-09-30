import Link from 'next/link';
import config from '../../blog.config';

const Footer = props => (
  <footer className="footer_wrap">
    <div className="l_in">
      <Link href="/about">
        <a>このサイトについて</a>
      </Link>
      <small className="l_in copyright">
        &copy; {new Date(config.startDate).getFullYear()} {config.author}
      </small>
    </div>
  </footer>
);

export default Footer;
