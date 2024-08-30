import { useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import IframeViewer from "./IframeViewer";

const CodeBox = ({
  // html = "",
  css = "",
  js = "",
  text = "",
}: {
  // html?: string;
  css?: string;
  js?: string;
  text?: string;
}) => {
  const [tab, setTab] = useState<"css" | "js">("js");
  const [code, setCode] = useState<string>("");

  const [codeBlock, setCodeBlock] = useState<{
    css: string;
    js: string;
  }>({
    css: "",
    js: "",
  });

  useEffect(() => {
    if (!text) return;

    const cd = { css: "", js: "" };
    const blocks = text?.split("```") || [];

    blocks.forEach((block) => {
      switch (block.slice(0, 3)) {
        case "jsx":
        case "tsx":
          cd.js = block;
          break;
        case "css":
          cd.css = block;
          break;
        // case "htm":
        //   cd.html = block;
        //   break;
      }
    });

    setCodeBlock(cd);
  }, [text]);

  useEffect(() => {
    switch (tab) {
      // case "html":
      //   setCode(html);
      //   break;
      case "css":
        setCode(css);
        break;
      case "js":
        setCode(js);
        break;
    }
  }, [tab, css, js]);

  useEffect(() => {
    console.log(codeBlock["js"], 898989);
  }, [codeBlock]);
  const handleTabClick = (tabKey: "css" | "js") => {
    setTab(tabKey);
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
        </ul>
        <div className="tab-content">
          <MarkdownViewer text={"```" + codeBlock[tab] + "```"} />
        </div>
      </div>
    </>
  );
};

export default CodeBox;
