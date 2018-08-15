// Action Type
const GET_CLUES = 'GET_CLUES'

// Action Creators
const getClues = clues => ({ type: GET_CLUES, clues })

// Thunks
export const loadClues = cluesId => dispatch => {
  try {
    const clues = tempClues
    dispatch(getClues(clues))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const reducer = (state = tempClues, action) => {
  switch (action.type) {
    case GET_CLUES:
      return action.clues
    default:
      return state
  }
}

export default reducer

const tempClues = {
  across: [
    { clueId: '1', clue: ' Midday' },
    { clueId: '7', clue: ' The Emerald Isle' },
    { clueId: '11', clue: ' Bring home' },
    { clueId: '14', clue: ' Superficial appearance' },
    { clueId: '15', clue: ' Not occurring naturally' },
    { clueId: '16', clue: ' Tulsa sch.' },
    { clueId: '17', clue: ' DAM' },
    { clueId: '19', clue: ' Car coat' },
    { clueId: '20', clue: ' Most-wanted group' },
    { clueId: '21', clue: ' Tony winner Neuwirth' },
    { clueId: '22', clue: ' Zap, in a way' },
    { clueId: '23', clue: ' Prefix with -phyte' },
    { clueId: '24', clue: ' FIRED' },
    { clueId: '26', clue: ' Reds, blacks, evens or odds, in roulette' },
    { clueId: '29', clue: ' Perform better than' },
    { clueId: '30', clue: ' Bird that can hardly get off the ground' },
    { clueId: '31', clue: ' Encomium' },
    { clueId: '36', clue: ' PARBOIL' },
    { clueId: '42', clue: ' Place for taps' },
    { clueId: '43', clue: ' Praise-filled poem' },
    { clueId: '44', clue: ' Result of tears on makeup' },
    { clueId: '47', clue: ' Device for spraying paint' },
    { clueId: '50', clue: ' STREAM' },
    { clueId: '55', clue: ' Ryan who co-starred in 1995\'s "French Kiss"' },
    { clueId: '56', clue: ' Machu Picchu builder' },
    { clueId: '57', clue: ' Headlight?' },
    { clueId: '58', clue: ' One putting money on the table' },
    { clueId: '61', clue: ' Something thrown to see who goes first' },
    { clueId: '62', clue: ' LYDIA' },
    { clueId: '64', clue: ' Red state grp.' },
    { clueId: '65', clue: ' Upscale hotel chain' },
    { clueId: '66', clue: ' Opposite of keyed up' },
    { clueId: '67', clue: ' Suffix with differ' },
    { clueId: '68', clue: ' Spritzes, e.g.' },
    { clueId: '69', clue: ' Tightly fixed' }
  ],
  down: [
    { clueId: '1', clue: ' "Orange Is the New Black" rating' },
    { clueId: '2', clue: ' Prosperity' },
    { clueId: '3', clue: ' Turning out' },
    { clueId: '4', clue: ' Tenant' },
    { clueId: '5', clue: ' Airplane course' },
    { clueId: '6', clue: ' Bungle' },
    { clueId: '7', clue: ' ___ Brickowski, protagonist of "The Lego Movie"' },
    { clueId: '8', clue: ' One of three people walking into a bar, in a joke' },
    { clueId: '9', clue: ' Do-nothing' },
    { clueId: '10', clue: ' Laura Bush ___ Welch' },
    { clueId: '11', clue: ' "Hold on, don\'t go yet!"' },
    { clueId: '12', clue: ' Removed from memory' },
    { clueId: '13', clue: ' Dressy rental' },
    { clueId: '18', clue: ' Muscles used in a Russian twist, for short' },
    { clueId: '22', clue: ' "___ words have never been spoken"' },
    { clueId: '25', clue: ' Pic' },
    { clueId: '26', clue: ' Kind of developer' },
    { clueId: '27', clue: ' "Where ___?"' },
    { clueId: '28', clue: ' Luminary' },
    { clueId: '32', clue: ' Basics of school learning, in brief' },
    { clueId: '33', clue: ' When sung five times, an Abba hit' },
    { clueId: '34', clue: ' High school science class, informally' },
    {
      clueId: '35',
      clue: ' Institute signed into existence by Thos. Jefferson'
    },
    { clueId: '37', clue: ' 2009 Peace Nobelist' },
    { clueId: '38', clue: " Doctor Zhivago's love" },
    { clueId: '39', clue: ' Request at the end of a meal, maybe' },
    { clueId: '40', clue: ' URL ender for 35-Down' },
    { clueId: '41', clue: " Stimpy's TV pal" },
    { clueId: '44', clue: ' Iota' },
    { clueId: '45', clue: ' Underling' },
    { clueId: '46', clue: ' Apart from' },
    { clueId: '48', clue: ' Attribute' },
    { clueId: '49', clue: " Didn't just criticize" },
    { clueId: '51', clue: ' Guilty feeling' },
    { clueId: '52', clue: ' Corrupt' },
    { clueId: '53', clue: " New York Bay's ___ Island" },
    { clueId: '54', clue: ' Mr. Rogers' },
    { clueId: '59', clue: ' "What ___ is there?"' },
    { clueId: '60', clue: ' Bassoon part' },
    { clueId: '62', clue: ' Chemical company that merged with DuPont' },
    { clueId: '63', clue: ' Giant part of a T. rex skeleton' }
  ]
}
