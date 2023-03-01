import { Configuration, OpenAIApi } from 'openai'
import AdminIds, { openaiModelId } from '@/helpers/constant'
import bot from '@/helpers/bot'
import env from '@/helpers/env'

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// generate response from provided prompt
export const generateResponse = async (prompt: string) => {
  try {
    return openai.createCompletion(
      {
        model: openaiModelId,
        prompt: prompt,
        max_tokens: 300,
        temperature: 0,
        top_p: 1,
        presence_penalty:0.1,
        frequency_penalty: 0.1,
      },
      {
        timeout: 20 * 1000,
      },
    )
  } catch (error) {
    await AdminIds.forEach((id) => {
      return bot.api.sendMessage(
        id,
        `Error Happened in OpenAI: ${error} For Prompt: ${prompt}`,
      )
    })
  }
  return false
}
export default openai
