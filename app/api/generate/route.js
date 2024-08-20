// import { NextResponse } from 'next/server'
// import OpenAI from 'openai'

// const systemPrompt = `
// You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
// Both front and back should be one sentence long.
// You should return in the following JSON format:
// {
//   "flashcards":[
//     {
//       "front": str,
//       "back": str
//     }
//   ]
// }
// `

// export async function POST(req) {
//     const openai = new OpenAI()
//     const data = await req.text()
  
//     const completion = await openai.chat.completions.create({
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: data },
//         ],
//         model: 'gpt-4o-mini',
//         response_format: { type: 'json_object' },
//     })

//     // Parse the JSON response from the OpenAI API
//     const flashcards = JSON.parse(completion.choices[0].message.content)

//     // Return the flashcards as a JSON response
//     return NextResponse.json(flashcards.flashcards)
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        //retrieve API key from environmnet variable
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        //set gemini model to use
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `
            You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
            The "front" should be a question about a term or keyword, and the "back" should be the answer.
            These flashcards should be relevant to the input text and unique. 
            You should return in the following JSON format:
            {
              flashcards:[
                {
                  "front": str,
                  "back": str
                }
              ]
            }
            `,
          generationConfig: { responseMimeType: "application/json" }
        })
        //receive "prompt" from request
        const data = await req.text()
        //set actual prompt from request
        const prompt = [
                    { role: 'system', content: "say hi" },
                    { role: 'user', content: data.text },
                    ]
        //generate ai response from the model
        const result = await model.generateContent(data)
        const response = await result.response;
        const textList = await response.text()
        // Parse the JSON response from the Gemini API
        const flashcards = JSON.parse(textList).flashcards
        //Return the flashcards as a JSON response
        return NextResponse.json(flashcards)
    } catch (error) {
        console.log("GenAI request error: %s", error)
    }
}