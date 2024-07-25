import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import "./trial.css";

// import "highlight.js/styles/base16/atelier-sulphurpool.css";
// import "highlight.js/styles/base16/woodland.css";

// import "highlight.js/styles/base16/atelier-sulphurpool-light.css";
// import "highlight.js/styles/stackoverflow-light.css";
// import "highlight.js/styles/intellij-light.css";

// const t =
//   '```jsx\nimport React from \'react\';\nimport \'./Login.css\';\n\nconst Login = () => {\n  return (\n    <div className="login-container">\n      <header className="login-header">\n        <nav>\n          <ul>\n            <li><a href="#products">상품</a></li>\n            <li><a href="#guide">개발 가이드</a></li>\n            <li><a href="#support">고객 지원</a></li>\n            <li><a href="#projects">프로젝트</a></li>\n            <li><a href="#scanner">스캐너</a></li>\n          </ul>\n        </nav>\n        <div className="login-buttons">\n          <button className="login-button">로그인</button>\n        </div>\n      </header>\n\n      <main className="login-main">\n        <h1>로그인</h1>\n        <h2><a href="#register">회원가입</a></h2>\n\n        <form className="login-form">\n          <div className="form-group">\n            <label htmlFor="username">아이디</label>\n            <input type="text" id="username" placeholder="아이디를 입력해주세요." />\n          </div>\n          <div className="form-group">\n            <label htmlFor="password">비밀번호</label>\n            <input type="password" id="password" placeholder="비밀번호를 입력해주세요." />\n            <button type="button" className="password-toggle">\n              <span role="img" aria-label="toggle password visibility">👁️</span>\n            </button>\n          </div>\n          <button type="submit" className="login-submit">로그인</button>\n        </form>\n\n        <div className="login-links">\n          <a href="#find-id">아이디 찾기</a>\n          <span>|</span>\n          <a href="#find-password">비밀번호 찾기</a>\n        </div>\n      </main>\n    </div>\n  );\n};\n\nexport default Login;\n```\n\n```css\n.login-container {\n  font-family: Arial, sans-serif;\n}\n\n.login-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #000;\n  color: #fff;\n  padding: 10px 20px;\n}\n\n.login-header nav ul {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.login-header nav ul li {\n  margin-right: 20px;\n}\n\n.login-header nav ul li a {\n  color: #fff;\n  text-decoration: none;\n  font-size: 14px;\n}\n\n.login-buttons {\n  display: flex;\n  align-items: center;\n}\n\n.login-button {\n  background: #007BFF;\n  color: #fff;\n  border: none;\n  padding: 10px 20px;\n  cursor: pointer;\n}\n\n.login-main {\n  max-width: 400px;\n  margin: 50px auto 0;\n  text-align: center;\n}\n\n.login-main h1 {\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n\n.login-main h2 {\n  font-size: 18px;\n  margin-bottom: 20px;\n}\n\n.login-main h2 a {\n  color: #007BFF;\n  text-decoration: none;\n}\n\n.login-form {\n  text-align: left;\n}\n\n.form-group {\n  margin-bottom: 15px;\n}\n\n.form-group label {\n  display: block;\n  margin-bottom: 5px;\n}\n\n.form-group input {\n  width: 100%;\n  padding: 10px;\n  box-sizing: border-box;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\n.password-toggle {\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  position: absolute;\n  right: 10px;\n  top: calc(50% - 10px);\n  font-size: 18px;\n}\n\n.login-submit {\n  background: #007BFF;\n  color: #fff;\n  border: none;\n  padding: 10px 20px;\n  width: 100%;\n  cursor: pointer;\n  border-radius: 4px;\n}\n\n.login-links {\n  margin-top: 20px;\n}\n\n.login-links a {\n  color: #007BFF;\n  text-decoration: none;\n}\n\n.login-links span {\n  margin: 0 10px;\n  color: #000;\n}\n```\n\n위 React 컴포넌트와 CSS 코드는 제공해 주신 이미지를 바탕으로 로그인 페이지를 구현한 것입니다. 이벤트 핸들링은 포함하지 않았습니다.';
const MarkdownView = ({ text }: { text?: string }) => {
  return (
    <>
      <div className="markdown-view">
        <ReactMarkdown children={text} rehypePlugins={[rehypeHighlight]} />
      </div>
    </>
  );
};

export default MarkdownView;
