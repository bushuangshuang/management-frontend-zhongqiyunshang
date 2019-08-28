export const storage = {
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
}

export const routerAceess = {
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
}
