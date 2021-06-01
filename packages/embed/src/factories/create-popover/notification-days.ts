const LOCAL_STORAGE_NOTIFICATION_DATA = 'tfNotificationData'

type LocalStorageNotificationData = {
  expiryDate: number
}
const today = new Date().getTime()

const getLocalStorageData = (): Record<string, LocalStorageNotificationData> => {
  const data = localStorage.getItem(LOCAL_STORAGE_NOTIFICATION_DATA)
  return data ? JSON.parse(data) : {}
}

const saveToLocalStorage = (data: Record<string, LocalStorageNotificationData>) => {
  data && localStorage.setItem(LOCAL_STORAGE_NOTIFICATION_DATA, JSON.stringify(data))
}

const getNotificationDotExpiryDate = (formId: string): number => {
  const data = getLocalStorageData()
  return data[formId]?.expiryDate
}

const saveNotificationDotExpiryDate = (formId: string, expiryDate: number) => {
  saveToLocalStorage({
    ...getLocalStorageData(),
    [formId]: {
      expiryDate,
    },
  })
}

export const canBuildNotificationDot = (formId: string, days: number) => {
  const expiryDate = getNotificationDotExpiryDate(formId)
  if (expiryDate) {
    return today < expiryDate
  }
  const newExpiryDate = new Date()
  newExpiryDate.setDate(newExpiryDate.getDate() + days)
  saveNotificationDotExpiryDate(formId, newExpiryDate.getTime())
  return true
}

export const buildNotificationDot = () => {
  const dot = document.createElement('span')
  dot.className = 'typeform-popover-unread-dot'
  dot.dataset.testid = 'typeform-popover-unread-dot'

  return dot
}
