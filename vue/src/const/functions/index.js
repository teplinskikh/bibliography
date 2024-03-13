export const capitalizeString = (str) => (str.charAt(0).toUpperCase() + str.slice(1))

export const authorStringShort = (author, reverse = false) => {
  const ar = []

  if (author.surname && !reverse) {
    ar.push(capitalizeString(author.surname))
  }

  if (author.name) {
    ar.push(capitalizeString(author.name.charAt(0) + '.'))
  }

  if (author.patronymic) {
    ar.push(capitalizeString(author.patronymic.charAt(0) + '.'))
  }

  if (author.surname && reverse) {
    ar.push(capitalizeString(author.surname))
  }

  return ar.join(' ')
}

export const authorStringFull = (author) => {
  const ar = []

  if (author.surname) {
    ar.push(capitalizeString(author.surname))
  }

  if (author.name) {
    ar.push(capitalizeString(author.name))
  }

  if (author.patronymic) {
    ar.push(capitalizeString(author.patronymic))
  }

  return ar.join(' ')
}
