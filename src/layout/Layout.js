import PropTypes from 'prop-types';
import Head from './Head';
import Header from '../ui/Header';
import Main from '../ui/Main';
import Footer from '../ui/Footer';

const Layout = props => {
  return (
    <>
      <Head {...props} />
      <Header categories={props.categories} />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string
};

export default Layout;
