import Head from 'next/head';
import PropTypes from 'prop-types';
import config from '../../blog.config';

const DocHead = props => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    <meta name="robots" content="none" />
    <link rel="canonical" href={props.url} />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6699cc" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="listful" />
    <meta name="application-name" content="listful" />
    <meta name="msapplication-TileColor" content="#d2e6f9" />
    <meta name="theme-color" content="#fff" />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    {props.imageUrl && <meta property="og:image" content={props.imageUrl} />}
    {props.imageAlt && <meta property="og:image:alt" content={props.imageAlt} />}
    <meta property="og:url" content={props.url} />
    <meta name="twitter:card" content={props.imageUrl ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:site" content={config.twitter} />
    <meta name="twitter:creator" content={config.twitter} />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.description} />
    {props.imageUrl && <meta property="twitter:image" content={props.imageUrl} />}
    {props.imageAlt && <meta property="twitter:image:alt" content={props.imageAlt} />}
  </Head>
);

DocHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  twitter: PropTypes.string
};

export default DocHead;
