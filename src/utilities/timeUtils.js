// utility time conversion function
export const secondsToTime = secs => {
  const hours = Math.floor(secs / (60 * 60))
  const minutesDivisor = secs % (60 * 60)
  const minutes = Math.floor(minutesDivisor / 60)
  const secondsDivisor = minutesDivisor % 60
  const seconds = Math.ceil(secondsDivisor)
  if (hours) return `${hours}:${minutes}:${seconds}`
  if (minutes)
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
  if (seconds < 10) return `0:0${seconds}`
  return `0:${seconds}`
}

export const getTimeSpent = timer => {
  return (
    Math.floor((Date.now() - timer.startTime) / 1000) + timer.accumulatedTime
  )
}
