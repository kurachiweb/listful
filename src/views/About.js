import { MDXProvider } from '@mdx-js/react';
import MarkdownContent from '../mdx/about.mdx';
import ArticleInfo from '../ui/ArticleInfo';

const About = ({ post }) => {
  return (
    <>
      <ArticleInfo post={post} />
      <article className="article">
        <MDXProvider>
          <MarkdownContent />
        </MDXProvider>
      </article>
    </>
  );
};

export default About;
