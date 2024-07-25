"use client";

import { MouseEvent, useState } from "react";
import styles from "@/app/assets/styles/main.module.scss";
import Image from "next/image";
import AddImage from "@/app/assets/images/add_image.png";
import MarkdownView from "./components/MarkdownViewer";

interface IMESSAGE {
  role: string;
  content: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<IMESSAGE[] | []>([]);

  const [image, setImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string>("");
  const [response, setResponse] = useState<string | undefined>("");

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleQuestionSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    if (!question.trim()) return;

    const userMessage: IMESSAGE = { role: "user", content: question };
    setChatHistory([...chatHistory, userMessage]);

    console.log(userMessage, "::: userMessage");

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userMessage),
      });

      const data = await response.json();

      const assistantMessage: IMESSAGE = {
        role: "assistant",
        content: data.answer,
      };

      console.log(response, ":::response");

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
      const errorMessage: IMESSAGE = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again later.",
      };
      setChatHistory((prevChatHistory) => [...prevChatHistory, errorMessage]);
    }

    setQuestion("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    // TODO: loading 처리할 것!
    if (!question && !base64Image) return;

    // 질문 초기화
    setQuestion("");

    const userMessage: IMESSAGE = { role: "user", content: question };
    setChatHistory([...chatHistory, userMessage]);

    console.log(userMessage, "::: userMessage");

    const formData: any = {
      question: question ? question : "",
      image: base64Image ? base64Image : "",
    };

    try {
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
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files?.[0];

    const files = event.dataTransfer.files;
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (base64) {
        setBase64Image(base64);
      }
      console.log(base64, "::: base64");
    };

    if (files.length > 0) {
      const file = files[0];
      reader.readAsDataURL(file);
    }

    if (newFile) {
      setFile(newFile);
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
    setQuestion(event.target.value);
  };

  // const handleSubmit = async () => {
  //   if (!image && !image) return;

  //   if (image) {
  //     FormData.append("image", image);
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.onloadend = async () => {
  //     const base64Image = reader.result?.toString().split(",")[1];

  //     try {
  //       const res = await fetch("/api/imageai", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           base64Image,
  //         }),
  //       });

  //       const data = await res.json();
  //       setResponse(JSON.stringify(data, null, 2));
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setResponse("An error occurred while processing the request.");
  //     }
  //   };
  // };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const PUBI = `</PUBI>`;

  return (
    <>
      <div className={styles.left_container}>
        <div className={styles.logo}>
          <Image src={AddImage} alt="image" width={50} />
          <span>{`=>`}</span>
          <h1>{PUBI}</h1>
        </div>

        <div className={styles.left_content}>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={styles.image_area}
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={150}
                height={150}
                style={{ width: "100%", height: "auto", maxWidth: "100%" }}
              />
            ) : (
              <p>Drag & drop an image here, or click to select one</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <input
            placeholder="Enter text here"
            value={question}
            onChange={handleTextChange}
            onKeyDown={(e) => handleKeyPress(e)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
          <button className={styles.submit_btn} onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>

      <div className={styles.right_container}>
        <div className={styles.right_box}>
          {chatHistory.length === 0 ? (
            <div className={styles.empty}>
              질문을 해야징 대충 어케 되는지 설명해주까?
            </div>
          ) : (
            chatHistory.map((message, index) => (
              <>
                <div
                  key={index}
                  className={`${styles.message} ${styles[message.role]}`}
                >
                  {message.content}
                </div>
                <MarkdownView text={message.content} />
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}
