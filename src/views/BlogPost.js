import { Component, Children, cloneElement, useRef } from 'react';
import MDX from '@mdx-js/runtime';
import CodeBlock from '../ui/CodeBlock';
import ArticleInfo from '../ui/ArticleInfo';

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  UnescapeTable = {
    '&#x7c;': '|',
    '&#x60;': '`'
  };

  UnescapeHTMLEntity = props => {
    return Children.map(props.children, child => {
      if (child.props) {
        if (typeof child.props.children === 'string') {
          // 子のない要素
          const cloned = cloneElement(child, {
            ...child.props,
            children: child.props.children.replace(/((?:&#\w{1,6}?;)+)/g, (match, p1) => this.UnescapeTable[p1])
          });
          return cloned;
        } else if (child.props.children) {
          const Recursive = this.UnescapeHTMLEntity;
          const cloned = cloneElement(child, {
            ...child.props,
            children: <Recursive props={child.props} />
          });
          return cloned;
        }
      }
      return child;
    });
  };

  components = {
    code: CodeBlock,
    HTMLUnescape: this.UnescapeHTMLEntity
  };

  render() {
    const { post } = this.props;
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
