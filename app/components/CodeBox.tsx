import { useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import IframeViewer from "./IframeViewer";

const CODE = {
  HTML: "html",
  CSS: "css",
  JS: "js",
} as const;
type TCode = (typeof CODE)[keyof typeof CODE];
type TCodeBlock = {
  [key in TCode]: string;
};

const CodeBox = ({
  // html = "",
  // css = "",
  // js = "",
  code = "",
}: {
  // html?: string;
  // css?: string;
  // js?: string;
  code?: string;
}) => {
  const [tab, setTab] = useState<TCode>(CODE.HTML);
  const [codeBlock, setCodeBlock] = useState<TCodeBlock>({
    html: "",
    css: "",
    js: "",
  });

  useEffect(() => {
    if (!code) return;

    const result: TCodeBlock = { html: "", css: "", js: "" };
    const blocks = code?.split("```") || [];

    blocks.forEach((block) => {
      switch (block.slice(0, 3)) {
        case "jsx":
        case "tsx":
          result.js = block;
          break;
        case "css":
          result.css = block;
          break;
        case "htm":
          result.html = block;
          break;
      }
    });

    setCodeBlock(result);
  }, [code]);

  const handleTabClick = (tabKey: TCode) => {
    setTab(tabKey);
  };

  return (
    <>
      <div className="codebox container">
        <div className="preview">
          <IframeViewer css={codeBlock.css} js={codeBlock.js}></IframeViewer>
        </div>
        <ul className="tab-nav">
          {Object.values(CODE).map((value) => (
            <li
              key={`codebox-tab-key-${value}`}
              className={tab == value ? "on" : ""}
              onClick={() => handleTabClick(value)}
            >
              {value}
            </li>
          ))}
        </ul>
        <div className="tab-content">
          <MarkdownViewer text={"```" + codeBlock[tab] + "```"} />
        </div>
      </div>
    </>
  );
};

export default CodeBox;
