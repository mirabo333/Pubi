import ReactMarkdown, { ExtraProps } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import "../assets/styles/trial.scss";
import { useEffect } from "react";

// import "highlight.js/styles/base16/atelier-sulphurpool.css";
// import "highlight.js/styles/base16/woodland.css";

// import "highlight.js/styles/base16/atelier-sulphurpool-light.css";
// import "highlight.js/styles/stackoverflow-light.css";
// import "highlight.js/styles/intellij-light.css";

const MarkdownViewer = ({ text }: { text?: string }) => {
  return (
    <>
      <div className="markdown-view">
        <ReactMarkdown children={text} rehypePlugins={[rehypeHighlight]} />
      </div>
    </>
  );
};

export default MarkdownViewer;
