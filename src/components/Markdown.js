import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


// See: https://github.com/remarkjs/react-markdown
// More plugins can be found: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
// And also: https://github.com/remarkjs/awesome-remark

const Markdown = ({ children }) => {
    return (
        <article
            className="prose prose-sm prose-neutral prose-h1:font-bold prose-h1:text-2xl prose-h2:font-semibold prose-h2:text-xl"
        >
            <ReactMarkdown
                linkTarget="_blank"
                remarkPlugins={[remarkGfm]}
            >
                {children}
            </ReactMarkdown>
        </article>
    );
};

export default Markdown;