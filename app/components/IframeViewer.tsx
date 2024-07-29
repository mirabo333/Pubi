import { useEffect, useState } from "react";

const IframeViewer = ({
  css,
  js,
  children,
}: {
  css?: string;
  js?: string;
  children?: string;
}) => {
  const [iFrame, setIFrame] = useState<any>(null);
  const [jsString, setJsString] = useState<string>("");

  useEffect(() => {
    const frame: HTMLIFrameElement = document.getElementById(
      "iframe-code-preview"
    ) as HTMLIFrameElement;

    console.log("IframeViewer");
    setIFrame(frame.contentWindow?.document || null);
  }, []);

  useEffect(() => {
    if (!js) {
      return;
    }

    const sIdx = js.indexOf("const");
    const eIdx = js.indexOf("export");
    const result = js.slice(sIdx, eIdx - 1);
    console.log(result);
    setJsString(result);
  }, [js]);

  useEffect(() => {
    if (!jsString) {
      return;
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Component Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
      </head>
      <body>
        <div id="lll"></div>
        <script type="text/babel">
          ${jsString}
  
          const root = ReactDOM.createRoot(document.getElementById('lll'));
          root.render(<App />);
        </script>
        <style>
          ${css}
        </style>
      </body>
    </html>`;
    setPreview(html);
  }, [jsString]);

  const retryRender = () => {
    console.log("retryRender", jsString);
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Component Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
      </head>
      <body>
        <div id="lll"></div>
        <script type="text/babel">
        ${jsString}
          const root = ReactDOM.createRoot(document.getElementById('lll'));
          root.render(<App />);
        </script>
        <style>
          ${css}
        </style>
      </body>
    </html>`;
    setPreview(html);
  };
  const setPreview = (html: string) => {
    if (iFrame) {
      iFrame.open();
      iFrame.write(html);
      iFrame.close();
    }
  };
  return (
    <>
      {/* <button onClick={retryRender}>retry</button> */}
      <iframe title="react-codepen-editor" id="iframe-code-preview" />
    </>
  );
};

export default IframeViewer;
