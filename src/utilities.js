import faker from 'faker'

const hashStr = (str) => {
  var hash = 0,
    i,
    chr,
    len
  if (str.length === 0) return hash
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const sportsCharacterMap = {
  a: ['🥅'],
  b: ['🎱'],
  d: ['🍺'],
  h: ['🥃', '🗄'],
  i: ['⛳️'],
  j: ['🏑'],
  l: ['🏒'],
  o: ['⚽️', '🏀', '🏈', '⚾️', '🏐', '🎾'],
  r: ['🏌️‍'],
  y: ['🍸', '🍷'],
}

const moneyCharacterMap = {
  a: ['₳'],
  b: ['฿'],
  c: ['¢', '©'],
  d: ['₫'],
  e: ['€'],
  f: ['₣'],
  k: ['₭'],
  l: ['￡'],
  m: ['₥'],
  n: ['₦'],
  o: ['💰', '🤑'],
  p: ['₱'],
  r: ['®'],
  s: ['$'],
  t: ['₮'],
  w: ['￦'],
  y: ['￥'],
}

const arlissify = (name, moneyThreshold, sportsThreshold, moreArliss) => {
  faker.seed(hashStr(name))
  const words = name.split(/\s+/)
  return words
    .map((word) =>
      arlissifyWord(word, moneyThreshold, sportsThreshold, moreArliss)
    )
    .join(' ')
}

const arlissifyWord = (word, moneyThreshold, sportsThreshold, moreArliss) => {
  let newWord = word
  if (moreArliss) {
    newWord = addMoreArliss(word)
  }

  const chars = newWord.split('')
  let newChars = chars.map((char) =>
    randomForCharacter(char, moneyThreshold, sportsThreshold, moreArliss)
  )
  return newChars.join('')
}

const randomForCharacter = (
  char,
  moneyThreshold,
  sportsThreshold,
  moreArliss
) => {
  const moneyChar = faker.random.arrayElement(
    moneyCharacterMap[char.toLowerCase()] || []
  )
  const sportsChar = faker.random.arrayElement(
    sportsCharacterMap[char.toLowerCase()] || []
  )
  const moneyRand = faker.random.number({ min: 0, max: 3 })
  const sportsRand = faker.random.number({ min: 0, max: 3 })

  if (moreArliss && char === 's') {
    return '$'
  }

  if (moneyThreshold > moneyRand && sportsThreshold > sportsRand) {
    if (sportsChar) {
      return sportsChar
    }
    if (moneyChar) {
      return moneyChar
    }
  }
  if (moneyThreshold > moneyRand && moneyChar) {
    return moneyChar
  }
  if (sportsThreshold > sportsRand && sportsChar) {
    return sportsChar
  }
  return char
}

const addMoreArliss = (word) => {
  if (!word) {
    return word
  }

  const spliceInStr = (ind, length, str) => {
    let wordChars = word.split('')
    wordChars.splice(ind, length, str)
    return wordChars.join('')
  }

  let matcher, result

  // match on a + r
  matcher = /(ar)/i
  result = matcher.exec(word)
  if (result) {
    const [_, match1] = result
    return spliceInStr(result.index, match1.length, 'arliss')
  }

  // match on vowel + r + any + l
  matcher = /(([aeiou])r\w?l([aeiou])?s?s?)/i
  result = matcher.exec(word)
  if (result) {
    const [_, match1, match2, match3] = result
    return spliceInStr(result.index, match1.length, `${match2 || 'a'}rliss`)
  }

  // match on vowel + r
  matcher = /(([aeiou])rl?([aeiou])?s?s?)/i
  result = matcher.exec(word)
  if (result) {
    const [_, match1, match2, match3] = result
    return spliceInStr(
      result.index,
      match1.length,
      `${match2 || 'a'}rl${match3 || 'i'}ss`
    )
  }

  // match on a
  matcher = /(ar?l?([aeiou])?s?s?)/i
  result = matcher.exec(word)
  if (result) {
    const [_, match1, match2] = result
    return spliceInStr(result.index, match1.length, `arl${match2 || 'i'}ss`)
  }

  // match on l
  matcher = /((a)?(r)?l([aeiou])?s?s?)/i
  result = matcher.exec(word)
  if (result) {
    const [_, match1, match2, match3, match4] = result
    return spliceInStr(
      result.index,
      match1.length,
      `${match2 || ''}${match3 || ''}l${match4 || 'i'}ss`
    )
  }

  return `${word}liss`
}

export { hashStr, addMoreArliss, arlissify }
