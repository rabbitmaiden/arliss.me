/* eslint-disable jsx-a11y/accessible-emoji */
import 'typeface-open-sans'
import 'typeface-montserrat'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Hidden,
  InputBase,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import baseball from '../images/baseball.png'
import faker from 'faker'

const hFonts = {
  fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
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
    subtitle1: hFonts,
  },
  palette: {
    primary: { main: '#7C102C' },
    secondary: { main: '#616161' },
    text: { primary: '#424242' },
  },
})

const useStyles = makeStyles({
  heroImageContainer: {
    position: 'absolute',
    maxHeight: '130px',
    overflow: 'hidden',
    zIndex: -100,
  },
  heroImage: {
    width: '700px',
  },
  title: {
    marginTop: '6px',
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
    background: theme.palette.primary.main,
    color: 'white',
    padding: '0 60px',
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
    padding: '6px 6px',
    marginLeft: '8px',
    marginRight: '8px',
    marginBottom: '8px',
  },
  minWidthButton: {
    padding: '6px 4px',
    marginLeft: '8px',
    marginRight: '8px',
    marginBottom: '8px',
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
  linkGroup: {
    marginTop: '30px',
  },
  linkFont: {
    fontSize: '8px',
    textDecoration: 'none',
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

const moreArlissArliss = (word) => {
  if (!word) {
    return word
  }
  const spliceInStr = (str, ind) => {
    let wordChars = word.split('')
    wordChars.splice(ind, 1, str)
    return wordChars.join('')
  }
  let chars = word.split('').map((c) => c.toLowerCase())
  let ind = chars.findIndex((c) => c === 'a')
  if (ind > -1) {
    return spliceInStr('arliss', ind)
  }
  ind = chars.findIndex((c) => c === 'r')
  if (ind > -1) {
    return spliceInStr('rliss', ind)
  }
  ind = chars.findIndex((c) => c === 'l')
  if (ind > -1) {
    return spliceInStr('liss', ind)
  }
  ind = chars.findIndex((c) => c === 'i')
  if (ind > -1) {
    return spliceInStr('iss', ind)
  }
  return `${word}liss`
}

const IndexPage = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [money, setMoney] = useState(0)
  const [sports, setSports] = useState(0)
  const [copying, setCopying] = useState(false)
  const [moreArliss, setMoreArliss] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [hasMoreArlissed, setHasMoreArlissed] = useState(false)

  const arlissifyName = () => {
    faker.seed(hashStr(name))
    const words = name.split(/\s+/)
    return words.map(arlissifyWord).join(' ')
  }

  const arlissifyWord = (word) => {
    let newWord = word
    if (moreArliss) {
      newWord = moreArlissArliss(word)
    }

    const chars = newWord.split('')
    let newChars = chars.map((char) =>
      randomForCharacter(char, money, sports, moreArliss)
    )
    return newChars.join('')
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

  const handleMoreArliss = () => {
    if (!moreArliss && !hasMoreArlissed) {
      setOpenDialog(true)
      return
    }
    setMoreArliss(!moreArliss)
  }

  const handleCloseDialog = (e, value) => {
    setOpenDialog(false)
    if (value) {
      setHasMoreArlissed(true)
      setMoreArliss(true)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(arlissifyName())
    setCopying(true)
    setTimeout(() => setCopying(false), 500)
  }

  const handleReset = () => {
    setMoney(0)
    setSports(0)
    setMoreArliss(false)
  }

  const handleClear = () => {
    handleReset()
    setName('')
    setHasMoreArlissed(false)
  }

  const canReset = () => {
    return money !== 0 || sports !== 0 || moreArliss
  }

  const canClear = () => {
    return canReset() || name !== ''
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflow: 'hidden' }}>
        <Grid
          container
          direction='row'
          justify='center'
          alignContent='center'
          spacing={3}
        >
          <Hidden xsDown>
            <Grid className={classes.heroImageContainer} item show>
              <img
                className={classes.heroImage}
                src={baseball}
                alt='Baseball'
              />
            </Grid>
          </Hidden>
          <Grid className={classes.title} item xs={12}>
            <Typography
              className={classes.titleFont}
              variant='h2'
              align='center'
            >
              <a href='/' className={classes.titleFontLink}>
                Arliss.me
              </a>
            </Typography>
          </Grid>
          <Grid className={classes.subtitle} item>
            <div className={classes.subtitleFont}>
              <Typography variant='subtitle1' align='center'>
                HIS NAME IS ARL⛳️$$
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
                ⛳️🥃🏀🏌️‍
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.arlissName} item xs={10} md={8} lg={6}>
            <InputBase
              fullWidth
              inputProps={{ style: { fontSize: 24 } }}
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
              onClick={handleMoreArliss}
            >
              {moreArliss ? 'Less Arli$$' : 'More Arli$$ *'}
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
          <Grid
            className={classes.linkGroup}
            item
            xs={10}
            md={8}
            lg={6}
            container
            direction='row'
            justify='flex-end'
          >
            <Typography
              className={classes.linkFont}
              variant='body1'
              color='primary'
              align='right'
            >
              <span>
                * More Arli$$ should only be used in extreme circumstances
              </span>
              <br />
              <span>
                Questions? Watch the{' '}
                <a
                  className={classes.linkFont}
                  href='https://twitter.com/GLucasTalkShow'
                >
                  George Lucas Talk Show
                </a>
              </span>
              <br />
              <a
                className={classes.linkFont}
                href='https://github.com/mstubna/arliss.me'
              >
                Source
              </a>
            </Typography>
          </Grid>
        </Grid>
      </div>
      <ConfirmationDialog
        classes={{ ...classes }}
        keepMounted
        id='confirm-more-arliss'
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </ThemeProvider>
  )
}

const ConfirmationDialog = (props) => {
  const { onClose, open, classes, ...other } = props
  const handleCancel = (e) => {
    onClose(e)
  }

  const handleOk = (e) => {
    onClose(e, true)
  }

  return (
    <Dialog
      maxWidth='xs'
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
      onBackdropClick={handleCancel}
      onEscapeKeyDown={handleCancel}
    >
      <DialogTitle id='confirm-more-arliss'>More Arli$$</DialogTitle>
      <DialogContent dividers>
        <Typography variant='body2'>
          More Arli$$ should only be used in extreme circumstances. Are you
          sure?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={handleCancel}
          color='secondary'
          variant='outlined'
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          onClick={handleOk}
          color='primary'
          variant='outlined'
        >
          Ye$$
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
}

export default IndexPage
