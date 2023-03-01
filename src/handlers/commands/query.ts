import { generateResponse } from '@/helpers/openai'
import Context from '@/models/Context'
import UserModel from '@/models/User'
import env from '@/helpers/env'
import sendOptions from '@/helpers/sendOptions'
import userExitsInGroup from '@/helpers/UserInGroup'

export default async function handlequery(ctx: Context) {
  if (!ctx.from) return

  const user = await UserModel.getUserByTelegramId(ctx.from.id)

  if (!user) {
    return ctx.reply(ctx.t('error.noUser'))
  }
  if (user.banned) {
    return ctx.reply(ctx.t('error.banned'))
  }

  const userExitsGroup = await userExitsInGroup(ctx.from.id)

  if (!userExitsGroup) {
    return ctx.reply(
      ctx.t('error.notInGroup', {
        group_username: env.CHAT_USERNAME,
      })
    )
  }

  const query = ctx.msg?.text?.split(' ').slice(1).join(' ')

  if (!query) return ctx.reply(ctx.t('error.noquery'))

  const loadingMsg = await ctx.reply(ctx.t('query.loading'), sendOptions(ctx))

  const response = await generateResponse(query)

  if (!response) return ctx.reply(ctx.t('error.noresponse'))

  const message = `${response.data.choices[0].text}`
  return loadingMsg.editText(message)
}
