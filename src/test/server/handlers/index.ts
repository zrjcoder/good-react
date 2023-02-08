import { authHandlers } from './auth'
import { discussionsHandlers } from './discussions'
// import { usersHandlers } from './users'

export const handlers = [
  ...authHandlers,
  ...discussionsHandlers,
  // ...usersHandlers,
]
