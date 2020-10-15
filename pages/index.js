import config from '../blog.config';
import Wrapper from '../src/layout/Wrapper';
import Posts from '../src/views/Posts';
import Pagination from '../src/ui/Pagination';
import { getAllPosts } from '../src/api';

const IndexPage = ({ posts, categories, pageIndex, numPages }) => (
  <Wrapper url={config.url} title={`${config.title} - ${config.subtitle}`} description={config.description} categories={categories} imageUrl={config.shareImage} imageAlt={config.shareImageAlt}>
    <Posts posts={posts} />
    <Pagination pageIndex={pageIndex} numPages={numPages} />
  </Wrapper>
);

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'published', 'updated', 'slug', 'author', 'category', 'coverImage', 'coverImageAlt', 'coverImageHeight', 'coverImageWidth', 'excerpt']);
  const categories = posts.map(post => post.category).filter((cat, i, arr) => arr.indexOf(cat) === i);

  const startIndex = 0;
  const endIndex = config.postsPerPage;
  const numPages = Math.ceil(posts.length / config.postsPerPage);

  return {
    props: {
      posts: posts.slice(startIndex, endIndex),
      categories: categories,
      pageIndex: 0,
      numPages
    }
  };
}

export default IndexPage;
