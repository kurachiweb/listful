import Wrapper from '../src/layout/Wrapper';
import About from '../src/views/About';
import config from '../blog.config';
import { getAllPosts } from '../src/api';

const post = { title: `${config.title}について` };

const AboutPage = ({ categories }) => (
  <Wrapper url="/about" title={post.title} description={'Learn more about ' + config.title} categories={categories} imageUrl={config.shareImage} imageAlt={config.shareImageAlt}>
    <About post={post} />
  </Wrapper>
);

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts(['category']);
  const categories = allPosts.map(post => post.category).filter((cat, i, arr) => arr.indexOf(cat) === i);

  return {
    props: {
      post,
      categories
    }
  };
}

export default AboutPage;
