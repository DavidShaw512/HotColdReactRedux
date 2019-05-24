// REDUCERS are pure functions - no side effects, predictable results. Should only be working on the
// state given to it

import {
    START_NEWGAME,
    MAKE_GUESS, 
    SET_AURAL_STATUS
} from '../actions/index';


const initialState = {
    guesses: [],
    feedback: 'Make your guess!',
    auralStatus: '',
    correctAnswer: Math.floor(Math.random() * 100) + 1
}

const gameReducer = (state=initialState, action) => {
    if (action.type === START_NEWGAME) {
        return {
            ...state,
            ...initialState,
            correctAnswer: Math.floor(Math.random() * 100) + 1
        }
    }
    
    if (action.type === MAKE_GUESS) {
        const guess = parseInt(action.guess, 10);
        if (isNaN(guess)) {
            return {
                ...state,
                feedback: "Please enter a valid number",
                guesses: [...state.guesses, guess]
            }
        }

        const difference = Math.abs(guess - state.correctAnswer);

        let feedback;
        if (difference >= 50) {
            feedback = 'You\'re Ice Cold...';
        } else if (difference >= 30) {
            feedback = 'You\'re Cold...';
        } else if (difference >= 10) {
            feedback = 'You\'re Warm.';
        } else if (difference >= 1) {
            feedback = 'You\'re Hot!';
        } else {
            feedback = 'You got it!';
        }

        return Object.assign({}, state, {
            feedback,
            guesses: [...state.guesses, guess]
        });
    }
    
    if (action.type === SET_AURAL_STATUS) {
        return {
            ...state,
            auralStatus: action.auralStatus
        }
    }

    return state;
}

export default gameReducer;