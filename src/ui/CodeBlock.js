import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : 'javascript';
  return (
    <Highlight {...defaultProps} code={children} language={language} theme={github}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, j) => (
                <span key={j} {...getTokenProps({ token, key: j })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
