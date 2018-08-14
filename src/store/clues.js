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

const tempClues = [
  {
    id: 0,
    clue:
      'In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since. “Whenever you feel like criticizing any one'
  },
  { id: 1, clue: '” he told me' },
  {
    id: 2,
    clue:
      ' “just remember that all the people in this world haven’t had the advantages that you’ve had.” He didn’t say any more'
  },
  {
    id: 3,
    clue: ' but we’ve always been unusually communicative in a reserved way'
  },
  {
    id: 4,
    clue:
      ' and I understood that he meant a great deal more than that. In consequence'
  },
  { id: 5, clue: ' I’m inclined to reserve all judgments' },
  {
    id: 6,
    clue:
      ' a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person'
  },
  {
    id: 7,
    clue:
      ' and so it came about that in college I was unjustly accused of being a politician'
  },
  { id: 8, clue: ' because I was privy to the secret griefs of wild' },
  {
    id: 9,
    clue:
      ' unknown men. Most of the confidences were unsought — frequently I have feigned sleep'
  },
  { id: 10, clue: ' preoccupation' },
  {
    id: 11,
    clue:
      ' or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men'
  },
  { id: 12, clue: ' or at least the terms in which they express them' },
  {
    id: 13,
    clue:
      ' are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that'
  },
  { id: 14, clue: ' as my father snobbishly suggested' },
  { id: 15, clue: ' and I snobbishly repeat' },
  {
    id: 16,
    clue:
      ' a sense of the fundamental decencies is parcelled out unequally at birth. And'
  },
  { id: 17, clue: ' after boasting this way of my tolerance' },
  {
    id: 18,
    clue:
      ' I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes'
  },
  {
    id: 19,
    clue:
      ' but after a certain point I don’t care what it’s founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby'
  },
  { id: 20, clue: ' the man who gives his name to this book' },
  { id: 21, clue: ' was exempt from my reaction — Gatsby' },
  {
    id: 22,
    clue:
      ' who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures'
  },
  { id: 23, clue: ' then there was something gorgeous about him' },
  { id: 24, clue: ' some heightened sensitivity to the promises of life' },
  {
    id: 25,
    clue:
      ' as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the “creative temperament.”— it was an extraordinary gift for hope'
  },
  {
    id: 26,
    clue:
      ' a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No — Gatsby turned out all right at the end; it is what preyed on Gatsby'
  },
  {
    id: 27,
    clue:
      ' what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and short-winded elations of men'
  }
]
