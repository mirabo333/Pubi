import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image, question } = await request.json();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const payload: any = {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [],
        },
      ],
      max_tokens: 1000,
    };

    if (image) {
      payload.messages[0].content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${image}`,
        },
      });

      payload.messages[0].content.push({
        type: "text",
        text: "이미지를 웹 페이지로 구현해줘. style은 나중에 재사용할 수 있도록 변수 처리랑 최대한 mixin 형태도 활용해주고, 자세히 분석해서 컴포넌트랑 css 작성해줘. 컴포넌트는 이름이 app인 react tsx파일로  작성해주고 css도 따로 작성해줘. 컴포넌트랑 css는 둘다 보기 편하게 들여쓰기를 4로 적용해서 보여줘. 이미지가 가지고 있는  border, width, height 그리고 button style이나 font 보고 제대로 적용해줘. 이미지를 최대한 웹으로 비슷하게 표현해주면 되. 만들어준 코드로 프로젝트를 만들꺼니까",
      });

      console.log(payload.message, "::: payloadMessage");
    }

    if (question) {
      payload.messages[0].content.push({
        type: "text",
        text: question,
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    console.log(response, "::: response");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log(responseData);

    return NextResponse.json(
      { answer: responseData.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
