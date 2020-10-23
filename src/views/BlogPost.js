import { Component, Children, cloneElement } from 'react';
import Link from 'next/link';
import MDX from '@mdx-js/runtime';
import config from '../../blog.config';
import CodeBlock from '../ui/CodeBlock';
import ArticleInfo from '../ui/ArticleInfo';

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  UnescapeTable = {
    '&#124;': '|',
    '&#x7c;': '|',
    '&#x60;': '`',
    '&#96;': '`'
  };

  UnescapeHTMLEntity = props => {
    return Children.map(props.children, child => {
      if (child.props) {
        if (typeof child.props.children === 'string') {
          // 子のない要素
          return cloneElement(child, {
            ...child.props,
            children: child.props.children.replace(/(&#\w{1,6}?;)/g, (match, p1) => this.UnescapeTable[p1])
          });
        } else if (child.props.children) {
          // 子のある要素
          return cloneElement(child, {
            ...child.props,
            children: this.UnescapeHTMLEntity(child.props)
          });
        }
      }
      return child;
    });
  };

  AnchorElem = props => {
    const URLParts = new URL(props.href, config.url);
    const thisSiteURL = new URL(config.url);
    if (URLParts.origin === thisSiteURL.origin) {
      // 同一オリジン、つまり確実にルーティングが効く
      if (URLParts.pathname.indexOf('/article') === 0) {
        return (
          <Link href="/article/[slug]" as={props.href}>
            <a>{props.children}</a>
          </Link>
        );
      } else {
        return (
          <Link href={props.href}>
            <a>{props.children}</a>
          </Link>
        );
      }
    } else {
      return (
        <a href={props.href} target="_blank" rel="nofollow noopener">
          {props.children}
        </a>
      );
    }
  };

  HCount = {
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0
  };
  HCountReseter = (...props) => {
    props.forEach(prop => (this.HCount[prop] = 0));
  };

  H2Elem = props => {
    this.HCountReseter('h3', 'h4', 'h5', 'h6');
    const id = `content__section_${this.HCount.h2++}`;
    return <h2 id={id}>{props.children}</h2>;
  };
  H3Elem = props => {
    this.HCountReseter('h4', 'h5', 'h6');
    const id = `content__section_${this.HCount.h2}_${this.HCount.h3++}`;
    return <h3 id={id}>{props.children}</h3>;
  };
  H4Elem = props => {
    this.HCountReseter('h5', 'h6');
    const id = `content__section_${this.HCount.h2}_${this.HCount.h3}_${this.HCount.h4++}`;
    return <h4 id={id}>{props.children}</h4>;
  };
  H5Elem = props => {
    this.HCountReseter('h6');
    const id = `content__section_${this.HCount.h2}_${this.HCount.h3}_${this.HCount.h4}_${this.HCount.h5++}`;
    return <h5 id={id}>{props.children}</h5>;
  };
  H6Elem = props => {
    const id = `content__section_${this.HCount.h2}_${this.HCount.h3}_${this.HCount.h4}_${this.HCount.h5}_${this.HCount.h6++}`;
    return <h6 id={id}>{props.children}</h6>;
  };

  components = {
    code: CodeBlock,
    HTMLUnescape: this.UnescapeHTMLEntity,
    a: this.AnchorElem,
    h2: this.H2Elem,
    h3: this.H3Elem,
    h4: this.H4Elem,
    h5: this.H5Elem,
    h6: this.H6Elem
  };

  render() {
    const { post } = this.props;
    this.HCountReseter('h2', 'h3', 'h4', 'h5', 'h6');

    return (
      <>
        <ArticleInfo post={post} />
        <article className="weak_shadow article">
          <MDX components={this.components}>{post.content}</MDX>
        </article>
      </>
    );
  }
}

export default BlogPost;
