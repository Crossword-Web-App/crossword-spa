const NUM_PUZZLES = 14493

const getRandomPuzzleId = () => {
    return Math.floor(Math.random()*(NUM_PUZZLES+1))
}

export default getRandomPuzzleId