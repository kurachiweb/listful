import Link from 'next/link';

const Posts = ({ posts }) => (
  <ul className="list_no_buret article_links">
    {posts &&
      posts.map(post => (
        <li className="article_link" key={post.slug}>
          <Link href={`/category/${post.category.toLowerCase()}`}>
            <a className="article_link_category">{post.category}</a>
          </Link>
          <Link href="/article/[slug]" as={`/article/${post.slug}`}>
            <a className="l_flex weak_shadow article_link_target">
              <h2 className="article_link_title">{post.title}</h2>
              <i className="icon icon__article_jump" />
            </a>
          </Link>
        </li>
      ))}
  </ul>
);

export default Posts;
