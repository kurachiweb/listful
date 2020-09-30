import MDX from '@mdx-js/runtime';
import CodeBlock from '../ui/CodeBlock';
import ArticleInfo from '../ui/ArticleInfo';

const BlogPost = ({ post }) => {
  const isLocal = process.env.NODE_ENV === 'development';

  const components = {
    pre: props => <div {...props} />,
    code: CodeBlock
  };

  return (
    <>
      <ArticleInfo post={post} />
      <article className="article">
        <MDX components={components}>{post.content}</MDX>
      </article>
    </>
  );
};

export default BlogPost;
