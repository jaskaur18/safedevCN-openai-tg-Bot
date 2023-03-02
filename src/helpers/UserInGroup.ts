import bot from '@/helpers/bot'
import env from '@/helpers/env'

export default async function userExitsInGroup(userId: number) {
  try {
    const userExitsInGroup = await bot.api.getChatMember(
      env.CHAT_USERNAME,
      userId
    )

    return (
      userExitsInGroup.status !== 'left' && userExitsInGroup.status !== 'kicked'
    )
  } catch (error) {
    console.log(`Can't get user status in group: ${error}`)
    return 'error'
  }
}
