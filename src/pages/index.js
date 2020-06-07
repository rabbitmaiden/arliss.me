/* eslint-disable jsx-a11y/accessible-emoji */
import 'typeface-open-sans'
import 'typeface-montserrat'
import React, { useState } from 'react'
import {
  Button,
  Grid,
  TextField,
  InputBase,
  Slider,
  Typography,
} from '@material-ui/core'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import faker from 'faker'
import { times, findIndex } from 'lodash'

const hFonts = {
  fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
  // fontWeight: 500
}
const theme = createMuiTheme({
  typography: {
    fontSize: 14,
    fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    useNextVariants: true,
    h1: hFonts,
    h2: hFonts,
    h3: hFonts,
    h4: hFonts,
    h5: hFonts,
    h6: hFonts,
  },
  palette: {
    primary: { main: '#ff1744' },
    secondary: { main: '#616161' },
    text: { primary: '#424242' },
  },
})

const useStyles = makeStyles({
  title: {
    marginTop: '20px',
    marginBottom: '-25px',
  },
  titleFont: {
    fontWeight: 800,
  },
  titleFontLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  subtitle: {},
  subtitleFont: {
    background: '#ff1744',
    color: 'white',
    padding: '0 50px',
  },
  textBox: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  slider: {},
  smallSliderLabel: {
    minWidth: '25px',
  },
  sliderLabel: {
    minWidth: '100px',
  },
  buttonGroup: {
    marginTop: '10px',
  },
  button: {
    marginLeft: '8px',
    marginRight: '8px',
  },
  minWidthButton: {
    marginLeft: '8px',
    marginRight: '8px',
    minWidth: '140px',
  },
  arlissName: {
    marginTop: '20px',
    marginBottom: '10px',
    background: '#efebe9',
    borderRadius: '4px',
  },
  arlissNameInput: {
    fontSize: 20,
  },
})

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
  r: ['🏌️‍♂️'],
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
  p: ['₽', '₱'],
  r: ['®'],
  s: ['$'],
  t: ['₮'],
  w: ['￦'],
  y: ['￥'],
}

const randomForCharacter = (char, moneyThreshold, sportsThreshold) => {
  const moneyChar = faker.random.arrayElement(
    moneyCharacterMap[char.toLowerCase()] || []
  )
  const sportsChar = faker.random.arrayElement(
    sportsCharacterMap[char.toLowerCase()] || []
  )
  const moneyRand = faker.random.number({ min: 0, max: 3 })
  const sportsRand = faker.random.number({ min: 0, max: 3 })
  if (moneyThreshold > moneyRand && sportsThreshold > sportsRand) {
    if (moneyThreshold > sportsThreshold && moneyChar) {
      return moneyChar
    }
    if (sportsChar) {
      return sportsChar
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

const IndexPage = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [money, setMoney] = useState(0)
  const [sports, setSports] = useState(0)
  const [copying, setCopying] = useState(false)
  const [special, setSpecial] = useState(false)

  const arlissifyName = () => {
    faker.seed(hashStr(name))
    const words = name.split(/\s+/)
    return words.map(arlissifyWord).join(' ')
  }

  const arlissifyWord = (word) => {
    let newWord = word
    if (special) {
      newWord = specialArliss(word)
    }

    const chars = newWord.split('')
    let newChars = chars.map((char) => randomForCharacter(char, money, sports))
    return newChars.join('')
  }

  const specialArliss = (word) => {
    if (!word) {
      return word
    }
    const spliceInStr = (str, ind) => {
      let wordChars = word.split('')
      wordChars.splice(ind, 1, str).join('')
      return wordChars.join('')
    }
    let chars = word.split('').map((c) => c.toLowerCase())
    let ind = findIndex(chars, (c) => c === 'a')
    if (ind > -1) {
      return spliceInStr('arliss', ind)
    }
    ind = findIndex(chars, (c) => c === 'r')
    if (ind > -1) {
      return spliceInStr('rliss', ind)
    }
    ind = findIndex(chars, (c) => c === 'l')
    if (ind > -1) {
      return spliceInStr('liss', ind)
    }
    ind = findIndex(chars, (c) => c === 'i')
    if (ind > -1) {
      return spliceInStr('iss', ind)
    }
    return `${word}liss`
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleMoneyChange = (e, value) => {
    setMoney(value)
  }

  const handleSportsChange = (e, value) => {
    setSports(value)
  }

  const handleSpecial = () => {
    setSpecial(!special)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(arlissifyName())
    setCopying(true)
    setTimeout(() => setCopying(false), 500)
  }

  const handleReset = () => {
    setMoney(0)
    setSports(0)
    setSpecial(false)
  }

  const handleClear = () => {
    handleReset()
    setName('')
  }

  const canReset = () => {
    return money !== 0 || sports !== 0 || special
  }

  const canClear = () => {
    return canReset() || name !== ''
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%', height: '100%' }}>
        <Grid
          container
          direction='row'
          justify='center'
          alignContent='center'
          spacing={3}
        >
          <Grid className={classes.title} item xs={12}>
            <Typography
              className={classes.titleFont}
              variant='h3'
              align='center'
            >
              <a href='/' className={classes.titleFontLink}>
                Arliss.me
              </a>
            </Typography>
          </Grid>
          <Grid className={classes.subtitle} item>
            <div className={classes.subtitleFont}>
              <Typography variant='h6' align='center'>
                Be like Arl⛳️$$
              </Typography>
            </div>
          </Grid>
          <Grid container direction='row' justify='center' item xs={12}>
            <Grid className={classes.textBox} item xs={10} md={8} lg={6}>
              <TextField
                fullWidth
                color='secondary'
                type='text'
                variant='outlined'
                label='Your name'
                value={name}
                onChange={handleNameChange}
              />
            </Grid>
          </Grid>
          <Grid
            className={classes.slider}
            item
            xs={12}
            container
            direction='row'
            justify='center'
            spacing={5}
          >
            <Grid item>
              <Typography
                className={classes.smallSliderLabel}
                variant='h5'
                align='center'
              >
                $
              </Typography>
            </Grid>
            <Grid item xs={5} md={4} xl={3}>
              <Slider
                defaultValue={0}
                step={1}
                marks
                min={0}
                max={4}
                valueLabelFormat={(value) => {
                  return times(value, () => '$').join('')
                }}
                value={money}
                onChange={handleMoneyChange}
              />
            </Grid>
            <Grid item>
              <Typography
                className={classes.sliderLabel}
                variant='h5'
                align='center'
              >
                $￥€฿
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction='row'
            justify='center'
            spacing={5}
          >
            <Grid item>
              <Typography
                className={classes.smallSliderLabel}
                variant='h5'
                align='center'
              >
                ⛳️
              </Typography>
            </Grid>
            <Grid className={classes.slider} item xs={5} md={4} xl={3}>
              <Slider
                defaultValue={0}
                step={1}
                marks
                min={0}
                max={4}
                valueLabelFormat={(value) => {
                  return times(value, () => '⛳️').join('')
                }}
                value={sports}
                onChange={handleSportsChange}
              />
            </Grid>
            <Grid item>
              <Typography
                className={classes.sliderLabel}
                variant='h5'
                align='center'
              >
                ⛳️🥃🏀🏌️‍♂️
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.arlissName} item xs={10} md={8} lg={6}>
            <InputBase
              fullWidth
              inputProps={{ style: { fontSize: 24 } }}
              inputLabelProps={{ style: { fontSize: 24 } }}
              type='text'
              placeholder='Your Arli$$ name'
              value={arlissifyName()}
            />
          </Grid>
          <Grid
            className={classes.buttonGroup}
            item
            container
            direction='row'
            justify='center'
            spacing={5}
          >
            <Button
              className={classes.minWidthButton}
              size='large'
              color='primary'
              variant='outlined'
              disabled={!name}
              onClick={handleSpecial}
            >
              {special ? 'Less Arli$$' : 'More Arli$$'}
            </Button>
            <Button
              className={classes.minWidthButton}
              size='large'
              color='primary'
              variant='outlined'
              disabled={!name}
              onClick={handleCopy}
            >
              {copying ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              className={classes.button}
              size='large'
              color='primary'
              variant='outlined'
              disabled={!canReset()}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className={classes.button}
              size='large'
              color='secondary'
              variant='outlined'
              disabled={!canClear()}
              onClick={handleClear}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}
export default IndexPage
