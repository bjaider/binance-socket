export const monthFormat = (data, callback) => {
  const months = data?.months
  let array = []
  for (let i = 0; i < months.length - 13; i++) {
    array.push([months[i], months[i + 13]])
  }
  callback(array)
}
