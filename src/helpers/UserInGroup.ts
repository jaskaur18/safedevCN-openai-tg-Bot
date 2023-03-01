import bot from '@/helpers/bot'
import env from '@/helpers/env'

export default async function userExitsInGroup(userId: number) {
  const userExitsInGroup = await bot.api.getChatMember(
    env.CHAT_USERNAME,
    userId
  )

  return (
    userExitsInGroup.status !== 'left' && userExitsInGroup.status !== 'kicked'
  )
}
