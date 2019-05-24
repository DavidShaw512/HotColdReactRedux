export const START_NEWGAME = 'START_NEWGAME';
export const startNewGame = state => ({
    type: START_NEWGAME
})

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = guess => ({
    type: MAKE_GUESS,
    guess
})

export const SET_AURAL_STATUS = 'SET_AURAL_STATUS';
export const setAuralStatus = auralStatus => ({
    type: SET_AURAL_STATUS,
    auralStatus
})