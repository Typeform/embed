const LOCAL_STORAGE_NOTIFICATION_DATA = 'tfNotificationData'

type LocalStorageNotificationData = {
  hideUntilTime: number
}

const getLocalStorageData = (): Record<string, LocalStorageNotificationData> => {
  const data = localStorage.getItem(LOCAL_STORAGE_NOTIFICATION_DATA)
  return data ? JSON.parse(data) : {}
}

const saveToLocalStorage = (data: Record<string, LocalStorageNotificationData>) => {
  data && localStorage.setItem(LOCAL_STORAGE_NOTIFICATION_DATA, JSON.stringify(data))
}

const getNotificationDotHideUntilTime = (formId: string): number => {
  const data = getLocalStorageData()
  return data[formId]?.hideUntilTime || 0
}

export const saveNotificationDotHideUntilTime = (formId: string, days: number) => {
  const hideUntilTime = new Date()
  hideUntilTime.setDate(hideUntilTime.getDate() + days)

  saveToLocalStorage({
    ...getLocalStorageData(),
    [formId]: {
      hideUntilTime: hideUntilTime.getTime(),
    },
  })
}

const clearNotificationDotHideUntilTime = (formId: string) => {
  const data = getLocalStorageData()
  delete data[formId]
  saveToLocalStorage(data)
}

export const canBuildNotificationDot = (formId: string) => {
  const hideUntilTime = getNotificationDotHideUntilTime(formId)
  const now = new Date().getTime()
  if (now > hideUntilTime) {
    if (hideUntilTime) {
      clearNotificationDotHideUntilTime(formId)
    }
    return true
  }
  return false
}

export const buildNotificationDot = () => {
  const dot = document.createElement('span')
  dot.className = 'tf-v1-popover-unread-dot'
  dot.dataset.testid = 'tf-v1-popover-unread-dot'

  return dot
}
