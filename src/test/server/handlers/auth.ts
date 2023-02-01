import { rest } from 'msw'
import { nanoid } from 'nanoid'

import { API_URL } from '@/config'

import { db, persistDb } from '../db'
import { authenticate, delayedResponse, hash, requireAuth } from '../utils'

type RegisterBody = {
  name: string
  email: string
  password: string
  teamId?: string
  teamName?: string
}

type LoginBody = {
  email: string
  password: string
}

export const authHandlers = [
  rest.post<LoginBody>(`${API_URL}/auth/login`, async (req, res, ctx) => {
    try {
      const credentials = req.body
      const result = await authenticate(credentials)

      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.get(`${API_URL}/auth/me`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      return delayedResponse(ctx.json(user))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.post<RegisterBody>(`${API_URL}/auth/register`, async (req, res, ctx) => {
    try {
      const userObject = req.body

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      })

      if (existingUser) {
        throw new Error('该用户已存在！')
      }

      let teamId, role

      // 没加入过小组
      if (!userObject.teamId) {
        const team = db.team.create({
          id: nanoid(),
          name: userObject.teamName ?? `${userObject.name} 小组`,
          createdAt: Date.now(),
        })
        persistDb('team')
        teamId = team.id
        role = 'ADMIN'
      } else {
        const existingTeam = db.team.findFirst({
          where: {
            id: {
              equals: userObject.teamId,
            },
          },
        })

        if (!existingTeam) {
          throw new Error('要加入的小组不存在！')
        }
        teamId = userObject.teamId
        role = 'USER'
      }

      db.user.create({
        ...userObject,
        id: nanoid(),
        createdAt: Date.now(),
        role,
        password: hash(userObject.password),
        teamId,
      })

      persistDb('user')

      const result = await authenticate({ email: userObject.email, password: userObject.password })

      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),
]
