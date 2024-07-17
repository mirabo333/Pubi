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
        text: "이미지를 react, css코드로 변환해서 코드만 보여줘"
      })

      console.log(payload.message, "::: payloadMessage");
    }

    if (question) {
      payload.messages[0].content.push({
        type: "text",
        text: question,
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    });

    console.log(response, "::: response")

    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log(responseData)
    
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



