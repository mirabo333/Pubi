"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "@/app/assets/styles/main.module.scss";
import Image from "next/image";
import AddImage from "@/app/assets/images/add_image.png";
import CLIPICON from "@/app/assets/images/ic-clip.png";
import CodeBox from "./components/CodeBox";
import SENDICON from "@/app/assets/images/ic-send.svg";
import LOADINGGIF from "@/app/assets/images/cat-loading.gif";
import SIDEBARICON from "@/app/assets/images/ic-toggle.png";
import { useTour } from "@reactour/tour";
import { setPriority } from "os";

interface IMESSAGE {
  role: string;
  content: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<IMESSAGE[] | []>([]);
  const [questionHisroty, setQuestionHistory] = useState<string[]>([]);

  // const [image, setImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string>("");
  const [response, setResponse] = useState<string | undefined>("");

  // const [file, setFile] = useState<File | null>(null);
  // const [text, setText] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [activeInput, setActiveInput] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [leftOpen, setLeftOpen] = useState<boolean>(true);
  const [resetCode, setResetCode] = useState<boolean>(false);

  const PUBI = `</PUBI>`;

  const leftSideRef = useRef(null);

  // TODO: question 적용 여부 확인 후 삭제
  // const handleQuestionSubmit = async (event: MouseEvent) => {
  //   event.preventDefault();

  //   if (!question.trim()) return;

  //   const userMessage: IMESSAGE = { role: "user", content: question };
  //   setChatHistory([...chatHistory, userMessage]);

  //   console.log(userMessage, "::: userMessage");

  //   try {
  //     const response = await fetch("/api/openai", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userMessage),
  //     });

  //     const data = await response.json();

  //     const assistantMessage: IMESSAGE = {
  //       role: "assistant",
  //       content: data.answer,
  //     };

  //     console.log(response, ":::response");

  //     if (response.ok) {
  //       setChatHistory((prevChatHistory) => [
  //         ...prevChatHistory,
  //         assistantMessage,
  //       ]);
  //     } else {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     const errorMessage: IMESSAGE = {
  //       role: "assistant",
  //       content: "Sorry, something went wrong. Please try again later.",
  //     };
  //     setChatHistory((prevChatHistory) => [...prevChatHistory, errorMessage]);
  //   }

  //   setQuestion("");
  // };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(event.target.files[0]);
  //   }
  // };

  const setImage = (file?: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.onloadend = () => {
        const base64 = reader.result?.toString().split(",")[1];
        if (base64) {
          setBase64Image(base64);
        }
        console.log(base64, "::: base64");
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    setBase64Image("");
    setQuestion("");
    // 코드 리셋
    // setResponse("");
  };

  const handleReset = () => {
    setResponse("");
    setPreview(null);
    setBase64Image("");
    setQuestion("");
    setResetCode(true);

    console.log(response, 78986789);
  };

  // 질문하기
  const handleSubmit = async () => {
    if (!question && !base64Image) return;

    // 질문 초기화
    setQuestion("");

    const userMessage: IMESSAGE = { role: "user", content: question };
    setChatHistory([...chatHistory, userMessage]);
    setQuestionHistory([...questionHisroty, userMessage.content]);

    console.log(chatHistory, "::: chat history");

    console.log(userMessage, "::: userMessage");

    const formData: any = {
      question: question ? question : "",
      image: base64Image ? base64Image : "",
    };

    try {
      // 로딩
      setLoading(true);
      const response = await fetch("/api/imageai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(JSON.stringify(data), 676767676666);
      setResponse(data.answer);

      const assistantMessage: IMESSAGE = {
        role: "assistant",
        content: data.answer,
      };

      console.log(assistantMessage, ":::assistantMessage");

      if (response.ok) {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          assistantMessage,
        ]);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing the request.");
    }

    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newFile: File | undefined = event.target.files?.[0];

    setImage(newFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // const newFile: File | undefined = event.dataTransfer.files?.[0];

    // setImage(newFile);
    const newFile = event.dataTransfer.files?.[0];

    const files = event.dataTransfer.files;
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (base64) {
        setBase64Image(base64);
      }
    };

    if (files.length > 0) {
      const file = files[0];
      reader.readAsDataURL(file);
    }

    if (newFile) {
      // setFile(newFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(1);
    setQuestion(event.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // left side bar toggle
  const handleToggleSideBar = () => {
    setLeftOpen(!leftOpen);
  };

  const { setIsOpen } = useTour();
  const [isFirst, setIsFirst] = useState<boolean | null>(null);

  useEffect(() => {
    const firstVisit = localStorage.getItem("isFirst") !== "false";

    if (firstVisit) {
      setIsFirst(true);
      setIsOpen(true);
      localStorage.setItem("isFirst", "false");
    } else {
      setIsFirst(false);
    }
  }, [setIsOpen]);

  return (
    <>
      <div
        className={`${styles.left_container} ${!leftOpen ? styles.open : ""}`}
      >
        <Image
          src={SIDEBARICON}
          width={64}
          height={64}
          alt="sidebar icon"
          className={styles.sidebar_icon}
          onClick={handleToggleSideBar}
        />
        <div className={styles.left_wrap} ref={leftSideRef}>
          <div className={styles.logo}>
            <Image src={AddImage} alt="image" width={50} />
            <span>{`=>`}</span>
            <h1>{PUBI}</h1>
          </div>

          {/* TODO: reset 기능 추가 */}
          <button className={styles.reset_btn} onClick={handleReset}>
            RESET
          </button>
          {/* <button className={styles.reset_btn} onClick={() => setIsOpen(true)}>
            tour guide
          </button> */}

          <div className={`${styles.left_content} add-img`}>
            <div
              className={`${styles.image_area}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {preview ? (
                <>
                  <Image
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={150}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  />
                  <button onClick={handleDelete}>delete</button>
                </>
              ) : (
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>

            <div
              className={`${styles.inputs} ${activeInput ? styles.active : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label>
                <Image src={CLIPICON} width={20} height={20} alt="파일 첨부" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
              <input
                placeholder="Enter text here"
                value={question}
                onChange={handleTextChange}
                onKeyDown={(e) => handleKeyPress(e)}
                onFocus={() => setActiveInput(true)}
                onBlur={() => setActiveInput(false)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />

              <button className={styles.submit_btn} onClick={handleSubmit}>
                <SENDICON /> SUBMIT
              </button>
            </div>

            {/* TODO: 질문 내용 */}
            <>
              {chatHistory.map((msg, i) => {
                <div key={i}>{msg.content}</div>;
              })}
            </>
          </div>
        </div>
      </div>

      <div className={`${styles.right_container}`}>
        <div
          className={`${styles.right_box} ${
            loading ? styles.loading : ""
          }  show-code`}
        >
          {loading ? (
            <>
              <p>progressing...</p>
              <Image src={LOADINGGIF} width={211} height={374} alt="loading" />
            </>
          ) : (
          <CodeBox code={response} />

            // <CodeBox css="css" js="js" text={response} />
            // {/* {chatHistory.length === 0 ? (
            //   // TODO: 대충 그럴싸하게 사용 방법 설명?
            //   <div className={styles.empty}>
            //     질문을 해야징 대충 어케 되는지 설명해주까?
            //   </div>
            // ) : (
            //   chatHistory.map((message, index) => (
            //     // TODO: image submit 시 question 어떻게 보여줄지
            //     <>
            //       <div
            //         key={index}
            //         className={`${styles.message} ${styles[message.role]}`}
            //       >
            //         {message.content}
            //       </div>
            //       <MarkdownViewer text={message.content} />
            //     </>
            //   ))
            // )} */}
          )}
        </div>
      </div>
    </>
  );
}
