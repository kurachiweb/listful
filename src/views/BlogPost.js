import { Component } from 'react';
import MDX from '@mdx-js/runtime';
import CodeBlock from '../ui/CodeBlock';
import ArticleInfo from '../ui/ArticleInfo';

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  components = {
    pre: compProps => <div {...compProps} />,
    code: CodeBlock
  };

  PostContentSelector = '.article *';

  HTMLEntityConverter(entity) {
    const doc = new DOMParser().parseFromString(entity, 'text/html');
    return doc.documentElement.textContent;
  }

  UnescapeHTMLEntity(root) {
    const allContentElems = root.document.querySelectorAll(this.PostContentSelector);
    return [].map
      .call(allContentElems, elem => {
        return [].filter.call(elem.childNodes, child => child.nodeType === 3);
      })
      .filter(elem => elem.length)
      .flat()
      .forEach(textNode => {
        textNode.textContent = textNode.textContent.replace(/((?:&#\w{3};)+)/g, (match, p1) => this.HTMLEntityConverter(p1))
      });
  }

  componentDidMount() {
    // 記事本文中のHTML実体参照をアンエスケープする
    this.UnescapeHTMLEntity(window);
  }

  render() {
    const { post, components } = this.props;
    return (
      <>
        <ArticleInfo post={post} />
        <article className="article">
          <MDX components={components}>{post.content}</MDX>
        </article>
      </>
    );
  }
}

export default BlogPost;
