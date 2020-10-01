import { Component } from 'react';

class PostCommon extends Component {
  constructor(props) {
    super(props);
    this.UnescapeHTMLEntity = this.UnescapeHTMLEntity.bind(this);
  }

  HTMLEntityConverter(entity) {
    const doc = new DOMParser().parseFromString(entity, 'text/html');
    return doc.documentElement.textContent;
  }

  UnescapeHTMLEntity() {
    console.log(window);
  }
}

export default PostCommon;
