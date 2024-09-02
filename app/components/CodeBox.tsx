import { useEffect, useState } from "react";
import Image from "next/image";
import MarkdownViewer from "./MarkdownViewer";
import IframeViewer from "./IframeViewer";
import COPYICON from "@/app/assets/images/ic-copy.svg";

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
  // // html = "",
  // css = "",
  // js = "",
  code = "",
}: {
  // // html?: string;
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

    // console.log(text, "::: text");

    blocks.forEach((block) => {
      switch (block.slice(0, 3)) {
        case "jsx":
        case "tsx":
          result.js = block;
          break;
        case "css":
          result.css = block;
          break;
        // case "htm":
        //   cd.html = block;
        //   break;
      }
    });

    console.log(blocks, ":???");
    // console.log(cd, ":::cd");

    // if (resetCode) {
    //   setCodeBlock({ css: "", js: "" });
    // } else {
    //   setCodeBlock((prev) => ({ ...prev, ...cd }));
    // }

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
          {/* <li
            className={tab == "html" ? "on" : ""}
            onClick={() => handleTabClick("html")}
          >
            html
          </li> */}
          <li
            className={tab == "js" ? "on" : ""}
            onClick={() => handleTabClick("js")}
          >
            js
          </li>
          <li
            className={tab == "css" ? "on" : ""}
            onClick={() => handleTabClick("css")}
          >
            css
          </li>
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
          {/* {text && (
            <button className="copy-btn" onClick={handleCopy}>
              copy
            </button>
          )} */}
          <Image
            src={COPYICON}
            alt="Copy"
            width={18}
            height={18}
            className="icon"
          />
          <MarkdownViewer text={"```" + codeBlock[tab] + "```"} />
        </div>
      </div>
    </>
  );
};

export default CodeBox;
