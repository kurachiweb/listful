import config from '../../../../blog.config';
import Wrapper from '../../../../src/layout/Wrapper';
import Posts from '../../../../src/views/Posts';
import Pagination from '../../../../src/ui/Pagination';
import { getAllPosts } from '../../../../src/api';

const PostsPage = ({ posts, category, categories, pageIndex, numPages }) => (
  <Wrapper url="/" title={`カテゴリ「${category}」の記事一覧(${pageIndex + 1}/${numPages}ページ) | ${config.title}`} description={config.description} categories={categories} imageUrl={config.shareImage} imageAlt={config.shareImageAlt}>
    <Posts posts={posts} />
    <Pagination category={category} pageIndex={pageIndex} numPages={numPages} />
  </Wrapper>
);

const categoryFormat = category => category.toLowerCase().replace(' ', '_');

const postFilter = ({ post, category }) => categoryFormat(post.category) === category;

export async function getStaticProps({ params }) {
  const category = params.category;
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'category', 'coverImage', 'coverImageAlt', 'coverImageHeight', 'coverImageWidth', 'excerpt']);
  const posts = allPosts.filter(post => postFilter({ post, category }));
  const categories = allPosts.map(post => post.category).filter((cat, i, arr) => arr.indexOf(cat) === i);

  const pageIndex = parseInt(params.page) - 1;
  const startIndex = pageIndex * config.postsPerPage;
  const endIndex = (pageIndex + 1) * config.postsPerPage;
  const numPages = Math.ceil(posts.length / config.postsPerPage);

  return {
    props: {
      posts: posts.slice(startIndex, endIndex),
      category,
      categories,
      pageIndex,
      numPages
    }
  };
}

const arrayMatchCount = (arr, searchValue) => arr.filter(each => each === searchValue).length;

export async function getStaticPaths() {
  const allPosts = getAllPosts(['category']);
  const categoriesRaw = allPosts.map(post => post.category);
  const categories = categoriesRaw.filter((cat, i, arr) => arr.indexOf(cat) === i);
  const paths = [];
  categories.map(category => {
    const count = arrayMatchCount(categoriesRaw, category)
    for (let i = 0; i < count; i++) {
      paths.push({
        params: {
          category: categoryFormat(category),
          page: i + 1 + ''
        }
      });
    }
  });

  return {
    paths,
    fallback: false
  };
}

export default PostsPage;
