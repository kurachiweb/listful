import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import ColorTheme from 'prism-react-renderer/themes/vsDark';

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : 'javascript';
  return (
    <Highlight {...defaultProps} code={children} language={language} theme={ColorTheme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <code className={className}>
          {tokens.slice(0, -1).map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, j) => (
                <span key={j} {...getTokenProps({ token, key: j })} />
              ))}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  );
};

export default CodeBlock;
