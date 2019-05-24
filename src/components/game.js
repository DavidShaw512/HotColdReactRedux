import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';
import {startNewGame, makeGuess, setAuralStatus} from '../actions/index';

class Game extends React.Component {
  // Don't forget restart, makeGuess


  generateAuralUpdate() {
    const { guesses, feedback } = this.props;

    // If there's not exactly 1 guess, we want to
    // pluralize the nouns in this aural update.
    const pluralize = guesses.length !== 1;

    let  auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

    if (guesses.length > 0) {
      auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
    }


    // this.props({ generateAuralStatus });
    this.props.updateAuralStatus(auralStatus)
  }

  render() {
    const { feedback, guesses, auralStatus, restart, makeGuess } = this.props;
    const guessCount = guesses.length;

    return (
      <div>
        <Header
          onRestartGame={restart}
          onGenerateAuralUpdate={this.generateAuralUpdate}
        />
        <main role="main">
          <GuessSection
            feedback={feedback}
            guessCount={guessCount}
            onMakeGuess={makeGuess}
          />
          <StatusSection guesses={guesses} 
            auralStatus={auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedback: state.feedback,
  guesses: state.guesses,
  auralStatus: state.auralStatus
});

const mapDispatchToProps = dispatch => ({
  updateAuralStatus: (auralStatus) => {
    // const actionObject = setAuralStatus(auralStatus);
    // dispatch(actionObject);
    dispatch(setAuralStatus(auralStatus))
  },
  makeGuess: (guess) => {
    dispatch(makeGuess(guess));
  },
  restart: () => {
    dispatch(startNewGame());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)