const storagePrefix = 'good_react_'

const storage = {
  getToken: () => {
    try {
      return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string)
    } catch {
      storage.clearToken()
    }
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token))
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`)
  },
}

export default storage
