import config from '../../blog.config';
import Wrapper from '../../src/layout/Wrapper';
import Posts from '../../src/views/Posts';
import Pagination from '../../src/ui/Pagination';
import { getAllPosts } from '../../src/api';

const allPosts = getAllPosts(['title', 'published', 'updated', 'slug', 'author', 'category', 'coverImage', 'coverImageAlt', 'coverImageHeight', 'coverImageWidth', 'excerpt']);

const PostsPage = ({ posts, categories, pageIndex, numPages }) => (
  <Wrapper url={`${config.url}page/${pageIndex}`} title={`記事一覧(${pageIndex + 1}/${numPages}ページ) | ${config.title}`} description={config.description} categories={categories} imageUrl={config.shareImage} imageAlt={config.shareImageAlt}>
    <Posts posts={posts} />
    <Pagination pageIndex={pageIndex} numPages={numPages} />
  </Wrapper>
);

export async function getStaticProps({ params }) {
  const categories = allPosts.map(post => post.category).filter((cat, i, arr) => arr.indexOf(cat) === i);

  const pageIndex = parseInt(params.page) - 1;
  const startIndex = pageIndex * config.postsPerPage;
  const endIndex = (pageIndex + 1) * config.postsPerPage;
  const numPages = Math.ceil(allPosts.length / config.postsPerPage);

  return {
    props: {
      posts: allPosts.slice(startIndex, endIndex),
      categories,
      pageIndex,
      numPages
    }
  };
}

export async function getStaticPaths() {
  const numPages = Math.ceil(allPosts.length / config.postsPerPage);

  return {
    paths: [...Array(numPages)].map((v, i) => {
      return {
        params: { page: i + 1 + '' }
      };
    }),
    fallback: false
  };
}

export default PostsPage;
