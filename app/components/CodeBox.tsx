import { useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import IframeViewer from "./IframeViewer";
import COPYICON from "@/app/assets/images/ic-copy.svg";

const CODE = {
  JS: "js",
  CSS: "css",
} as const;
type TCode = (typeof CODE)[keyof typeof CODE];
type TCodeBlock = {
  [key in TCode]: string;
};

const CodeBox = ({
  code = "",
}: {
  code?: string;
}) => {
  const [tab, setTab] = useState<TCode>(CODE.JS);
  const [codeBlock, setCodeBlock] = useState<TCodeBlock>({
    js: "",
    css: "",
  });

  useEffect(() => {
    const result: TCodeBlock = { js: "", css: "" };
    const blocks = code?.split("```") || [];

    if (!code) {
      if(codeBlock.css || codeBlock.js) {
        setCodeBlock(result);
      }
      return;
    }

    blocks.forEach((block) => {
      switch (block.slice(0, 3)) {
        case "jsx":
        case "tsx":
        case "typescript":
          result.js = block;
          break;
        case "css":
          result.css = block;
          break;
      }
    });

    // console.log(blocks, ":???");
    setCodeBlock(result);
  }, [code]);

  const handleTabClick = (tabKey: TCode) => {
    setTab(tabKey);
  };

  const handleCopy = async () => {
    try {
      const text = codeBlock[tab];
      await navigator.clipboard.writeText(text);
      alert(`${tab} copied to clipboard!`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
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
          {codeBlock[tab] && (
            <button className="copy-btn" onClick={handleCopy}>
              <COPYICON />
            </button>
          )}
          <MarkdownViewer text={"```" + codeBlock[tab] + "```"} />
        </div>
      </div>
    </>
  );
};

export default CodeBox;
