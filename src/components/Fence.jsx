import { Fragment } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import clsx from 'clsx';
import CopyButton from '@/components/CopyButton';

export function Fence({ children, language }) {
  return (
    <Highlight
      {...defaultProps}
      code={children.trimEnd()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <div className="relative group">
          <CopyButton
            className="group-hover:opacity-100 opacity-0 absolute top-2 right-2 z-10"
            content={children.toString().trimEnd()}
          />
          <pre className={clsx(className)} style={style}>
            <code>
              {tokens.map((line, lineIndex) => (
                <Fragment key={lineIndex}>
                  {line
                    .filter((token) => !token.empty)
                    .map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  {'\n'}
                </Fragment>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  )
}
