import { worker } from './browser'

export async function prepare() {
  if (import.meta.env.DEV) {
    return worker.start({ onUnhandledRequest: 'bypass' })
  }
}
