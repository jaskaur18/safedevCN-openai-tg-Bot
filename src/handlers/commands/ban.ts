import Context from '@/models/Context'
import UserModel from '@/models/User'
import sendOptions from '@/helpers/sendOptions'

export default async function handleban(ctx: Context) {
  const [userId, ban] = ctx.msg?.text?.split(' ')?.shift() || []
  if (!userId || !ban) return ctx.reply('error.novalidoption')

  if (!ctx.isAdmin) return ctx.reply('error.noAdmin')

  await UserModel.banUser(userId, ban === 'ban' ? true : false)
  return ctx.reply(
    `User ${userId} has been ${
      ban === 'ban' ? 'banned' : 'unbanned'
    } successfully`,
    sendOptions(ctx)
  )
}
