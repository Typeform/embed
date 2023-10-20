export const mergeOptions = (
  ...args: Array<Record<string, undefined | string | boolean | number | Record<string, unknown>>>
) =>
  args.reduce((options, slice) => {
    Object.entries(slice).forEach(([key, value]) => {
      if (value === undefined) {
        return options
      }

      if (typeof options[key] === 'object' && typeof value === 'object') {
        options[key] = { ...(options[key] as object), ...value }
      } else {
        options[key] = value
      }
    })

    return options
  }, {})
