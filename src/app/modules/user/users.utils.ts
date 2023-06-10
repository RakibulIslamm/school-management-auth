import User from './user.model'

export const generateUserId = async () => {
  const lastUser = await User.findOne({}, {}, { sort: { id: -1 } })
  const lastDigits: string = lastUser
    ? String(parseInt(lastUser?.id.slice(-3)) + 1)
    : '1'
  const newId = lastDigits.padStart(9, '213031000')
  return newId
}
