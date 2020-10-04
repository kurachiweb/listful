import Link from 'next/link';

const ArticleInfo = ({ post }) => (
  <div className="article_info">
    {post.category && (
      <Link href="/category/[category]" as={`/category/${post.category.toLowerCase()}/`}>
        <a className="article_info_category">{post.category}</a>
      </Link>
    )}
    <section className="l_flex weak_shadow article_info_target">
      <h1 className="article_info_title">
        {post.title}
      </h1>
    </section>
  </div>
);

export default ArticleInfo;
