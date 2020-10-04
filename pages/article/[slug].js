import Wrapper from '../../src/layout/Wrapper';
import BlogPost from '../../src/views/BlogPost';
import config from '../../blog.config';
import { getPostBySlug, getAllPosts } from '../../src/api';

const PostPage = ({ post, categories }) => (
  <Wrapper url={`/article/${post.slug}`} title={`${post.title} | ${config.title}`} description={post.excerpt} categories={categories} imageUrl={config.url + post.coverImage} imageAlt={post.coverImageAlt}>
    <BlogPost post={post} />
  </Wrapper>
);

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts(['title', 'published', 'updated', 'slug', 'author', 'category', 'coverImage', 'coverImageAlt', 'coverImageHeight', 'coverImageWidth', 'excerpt']);
  const thisPost = getPostBySlug(params.slug, ['title', 'excerpt', 'published', 'updated', 'slug', 'author', 'category', 'content', 'coverImage', 'coverImageAlt', 'coverImageHeight', 'coverImageWidth']);
  const categories = allPosts.map(eachPost => eachPost.category).filter((cat, i, arr) => arr.indexOf(cat) === i);

  return {
    props: {
      post: thisPost,
      categories
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: { ...post }
      };
    }),
    fallback: false
  };
}

export default PostPage;
