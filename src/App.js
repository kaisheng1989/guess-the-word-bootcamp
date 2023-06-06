import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// setting the number of guesses to 10.
const No_Of_Starting_Guesses = 10;

class App extends React.Component {
  constructor(props) {
    super(props);
    // Calling super with props in constructor to start the parent class.
    this.state = {
      // Select a word from Words.json by calling the get random word function.
      currentWord: getRandomWord(),
      // Have an array to store all the letters guaessed by the user.
      guessedLetter: [],
      // The number of guesses provided to the users at the start of the game is 10.
      numberGuessesLeft: No_Of_Starting_Guesses,
      //Input control the value in the form field.
      round:0,
      score:0,
    };
  }

  // For each letter that the user guess it will be display if the user guessed letter matching the word selected.
  generateWordDisplay = () => {
    const wordDisplay = [];
    // Display each letter in the current word that matches / exists in the random word selected
    for (let letter of this.state.currentWord) {
      // Show the word once the number of gusseses left is 0
      if (
        this.state.guessedLetter.includes(letter) ||
        this.state.numberGuessesLeft === 0
      ) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // Portion to handle after submit button is clicked.
  handleSubmit = (event) => {
    // Prevent default form submit behaviour that refreshes the page.
    event.preventDefault();
    if (!this.state.input) {
      return;
    }
    // Only push/save the lowercase of first letter of submission.
    const inputLetter = this.state.input[0].toLowerCase();

    // setting the state once submit button is clicked.
    this.setState((state) => ({
      // use the previous state (not this.state) tp generate the new state for the gussesed letter.
      // The spread (...) syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
      guessedLetter: [...state.guessedLetter, inputLetter],
      numberGuessesLeft: this.state.currentWord.includes(inputLetter)
        ? this.state.numberGuessesLeft
        : this.state.numberGuessesLeft - 1,
      // Reset input field.
      input: "",
      
    }));
  };
  checkIfUserGuessedWord = (inputLetter) => {
    // create a new array with spread operator because we do not wish to alter this.state.guessedLetter.
    const guessedLetter = [...this.state.guessedLetter, inputLetter];
    for (let letter of this.state.currentWord) {
      if (!guessedLetter.includes(letter)) {
        return false;
      }
    }
    // Return true if guessed Letters contains all letters in thet this.state.currentwords
    return true;
  };

  

  // When resent game is being triggered, the current state
  resetGame = () => {
    this.setState({
      currentWord: getRandomWord(),
      guessedLetter: [],
      numberGuessesLeft: No_Of_Starting_Guesses,
      input: "",
      round:this.state.round +1,
      score:this.checkIfUserGuessedWord() ?this.state.score+1 :1,
    });
  };
  render() {
    const hasuserGuessedWord = this.checkIfUserGuessedWord();
    // not allowing the user to input if a correct guess word has been made or exhaust the number of guesses.
    const shouldDisableInput =
      hasuserGuessedWord || this.numberGuessesLeft === 0;
    const playAgainButton = (
      <Button onClick={this.resetGame} className="btn btn-outline-warning btn btn-dark"> Play Again </Button>
      
    );

    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess the Word</h1>
          <br></br>
          {/* Show user the number of letters in  the word and position of correctly-guesses letters */}
          <Container className="bg-warning">
            <Row>
              <Col>
                <h3>Guessed Letter</h3>
                {this.state.guessedLetter.length > 0
                  ? this.state.guessedLetter.toString()
                  : "-"}
              </Col>
              <Col>
                <h3>Word Display</h3>
                {this.generateWordDisplay()}
                {/*Show user letters they have guesses and number of guessses left */}
              </Col>
              <Col>
                <h3>Number of Guesses Left: {this.state.numberGuessesLeft}</h3>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <h3>Number of Rounds played: {this.state.round}</h3>
              </Col>
              <Col>
                <h3>Words Guess Correctly: {this.state.score}</h3>
              </Col>
            </Row>
          </Container>
          <br></br>
          <br></br>
          <h2>Input:</h2>
          <h3 class="text-danger">Please submit 1 letter at a time. </h3>
          <form onSubmit={this.handleSubmit}>
            {/*Disbale input fields once user guess the word or run out of Guesses */}
            {/*Setting the type of input */}
            <input
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
              disabled={shouldDisableInput}
            />
            <br></br>
            <input
              class="btn btn-outline-warning"
              type="submit"
              value="Submit"
              disabled={shouldDisableInput}
            />
          </form>
          {/*Congratution message once the user guesses the word */}
          {hasuserGuessedWord && (
            <div>
              <p>You have Guess Word!</p>
              {playAgainButton}
            </div>
          )}
          {/*Consolation Message if the user runs out of guesses */}
          {this.state.numberGuessesLeft === 0 && !hasuserGuessedWord && (
            <div>
              <p> Sorry, You ran out of guesses. </p>
              {playAgainButton}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
