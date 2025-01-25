export const safeParseJson = <T>(str: string) => {
  try {
    const json: T = JSON.parse(str)

    return json
  } catch {
    return undefined
  }
}
