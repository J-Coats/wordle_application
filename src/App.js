/*
Author: Jared Coats
Assignment: Wordle App
CS 470
Date: February 20, 2023
Description: Aims to recreate a wordle application that resembles the NY times wordle application as close as
possible using react and material ui.
 */

import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';


import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard";
import MessageCenter from "./pages/MessageCenter";
import TopBanner from "./pages/TopBanner";
import boxStyleVariants from "./pages/keyboardAndGuessAreaBoxTypes";

const wordleLibrary = require('./fiveLetterWords.json');
//console.log(wordleLibrary);
const grabWord = wordleLibrary[Math.floor(Math.random() * wordleLibrary.length)];
const chosenWord = grabWord.toUpperCase();
console.log(chosenWord);


const config = {
    numBoxesPerRow: 5,
    numBoxRows: 6,
    widthOfABox: 50,
    heightOfABox: 50,
    gapBetweenBoxes: 10,
    initialBackgroundColor: 'white'
};


// num_occurences and count_seen are helpers used for word checking logic when enter key is pressed
// tries to make sure that color of guess area boxes are updated correctly based on whether we've seen
// a letter or not.
const num_occurences = (word, letter) => {
    let counter = 0;
    for (let i = 0; i < 5; i += 1) {
        if (word[i] === letter)
            counter += 1;
    }
    return counter;
}

const count_seen = (seen_array, letter) => {

    let counter = 0;
    for (let i = 0; i < seen_array.length; i += 1) {
        if (seen_array[i] === letter)
            counter += 1;
    }

    return counter;
}



function App() {


    const keyrow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const keyrow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const keyrow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const createStartingKeyBoard = () => {
        // did delete and enter keys separately because they have special actions in comparison to the other letters
        const deleteKey = {
            delete: true,
            ...boxStyleVariants.keyboardUnusedKey,
            key_letter: 'Del'
        }
        const enterKey = {
            enter: true,
            ...boxStyleVariants.keyboardUnusedKey,
            key_letter: 'Enter'
        }
        let row1 = keyrow1.map(letter => ({...boxStyleVariants.keyboardUnusedKey, key_letter: letter}));
        let row2 = keyrow2.map(letter => ({...boxStyleVariants.keyboardUnusedKey, key_letter: letter}));
        let row3 = keyrow3.map(letter => ({...boxStyleVariants.keyboardUnusedKey, key_letter: letter}));
        row3.push(deleteKey);
        const newrow3 = [enterKey].concat(row3);

        return [...row1, ...row2, ...newrow3];

    }

    const [activeRow, setActiveRow] = useState(new Array(config.numBoxesPerRow).fill(boxStyleVariants.blankBox));
    const [currentRowPos, setCurrRowPos] = useState(0);
    const [keyboard, setKeyboard] = useState(createStartingKeyBoard);
    const [completedRow, setCompletedRow] = useState([]);
    const [remainingRows, setRemainingRow] = useState(Array((config.numBoxRows - 1) * 5).fill(boxStyleVariants.blankBox));

    const allRows = [...completedRow, ...activeRow, ...remainingRows];

    const [gameOver, setResult] = useState({finished: false, result: false});



    const keyboardClickCallback = (keys_attributes) => {
        // This function handles all keyboard click callbacks from the keyboard component.
        // 1. Handles delete key clicks
        // 2. Handles enter key clicks
        // 3. Handles letter key clicks.


        // This just makes sure that once the game is over the guessArea won't accept more input
        if (gameOver.finished)
            return;


        // if the delete key is clicked
        if (keys_attributes.delete) {
            if (currentRowPos !== 0) {
                // 1. erase the most recent clicked letter
                // 2. update the active row
                // 3. set current position in activeRow to the previous space

                const newActiveRow = activeRow.slice();
                newActiveRow[currentRowPos - 1] = boxStyleVariants.blankBox;
                setActiveRow(newActiveRow);
                setCurrRowPos(currentRowPos - 1);
                return;
            } else {
                return;
            }
        }


        // if enter key is clicked
        if (keys_attributes.enter) {

            // Only does anything if a full 5 letters have been entered into active row
            if (currentRowPos === 5) {

                let guessWord = "";

                if (completedRow.length >= 30)
                    return;

                // we're going to store the letters that are in activeRow into guessWord
                for (let i = 0; i < 5; i += 1) {

                    const guessLetter = activeRow[i].key_letter.toUpperCase();
                    guessWord += guessLetter;

                }

                // if the guess doesn't exist in our word bank, we don't want to do anything
                if (!wordleLibrary.includes(guessWord.toLowerCase()))
                    return;

                // if we found an exact match:
                if (chosenWord.toUpperCase() === guessWord) {

                    // update colors of guessArea active row and keyboard letters
                    for (let j = 0; j < 5; j += 1) {
                        activeRow[j].color = boxStyleVariants.exactMatch;
                        changeKeyboard(guessWord[j], 'match');
                    }

                    // make sure to update the state of the game. This is used to:
                    // 1. Check if game is finished (either a win, or loss)
                    // 2. Check if won or lost
                    // This is helpful for message in message center as well as not allowing anymore key presses through
                    const state = gameOver;
                    state.finished = true;
                    state.result = true;
                    setResult(state);
                    return;

                } else {
                    // uses seen_array to store letters we've seen
                    let seen_array = [];
                    for (let j = 0; j < 5; j += 1) {

                        if (chosenWord[j] === guessWord[j]) {
                            seen_array.push(guessWord[j]);
                            activeRow[j].color = boxStyleVariants.exactMatch;
                            changeKeyboard(chosenWord[j], 'match');

                        } else {

                            if (chosenWord.includes(guessWord[j])) {
                                changeKeyboard(guessWord[j], 'partial');
                                const x = num_occurences(chosenWord, guessWord[j]);
                                const y = count_seen(seen_array, guessWord[j]);
                                if (y < x) {
                                    seen_array.push(guessWord[j]);
                                    if (activeRow[j].color !== boxStyleVariants.exactMatch)
                                        activeRow[j].color = boxStyleVariants.partialMatch;
                                }
                                else {
                                    activeRow[j].color =boxStyleVariants.noMatch;
                                }

                            } else {
                                activeRow[j].color = boxStyleVariants.noMatch;
                                changeKeyboard(guessWord[j], 'noMatch');

                            }
                        }
                    }


                }

                if (remainingRows.length <= 0) {

                    setResult({finished: true, result: false});
                    return;

                } else {

                    completedRow.push(...activeRow);
                    remainingRows.length -= 5;
                    const newActiveRow = activeRow.slice();
                    newActiveRow.fill(boxStyleVariants.blankBox);
                    setActiveRow(newActiveRow);
                    setCurrRowPos(0);
                    return;

                }

            } else {
                return;
            }
        }

        // this makes sure that if you click a letter key again while active row is filled nothing happens
        if (currentRowPos === 5)
            return;

        // if it was a letter key clicked
        letterKeyCall(keys_attributes.key_letter);


    }


    const changeKeyboard = (currletter, gameState) => {

        // This function handles calls from when the enter key is clicked with a valid word in the active row
        // Will update the colors of keyboard letter to green with match, yellow for partial match, and dark grey
        // for no match.

        // create a keyboard used to update to new keyboard later
        const temp = keyboard.slice();
        const current_letter = currletter.toUpperCase();

        for (let i = 0; i < temp.length; i += 1) {
            // iterates through whole keyboard stopping at the letter passed to it in order to update
            // the keyboard with the correct color
            if (temp[i].key_letter === current_letter) {

                if (gameState === 'match') {
                    temp[i].color = boxStyleVariants.exactMatch;
                    setKeyboard(temp);
                    return;
                }
                else if (gameState === 'noMatch') {

                        temp[i].color = boxStyleVariants.noMatch;
                        setKeyboard(temp);
                        return;

                } else {

                    if (temp[i].color !== boxStyleVariants.exactMatch) {
                        temp[i].color = boxStyleVariants.partialMatch;
                        setKeyboard(temp);

                    }

                    return;

                }
            }
        }
    }

    const letterKeyCall = (key_letter) => {
        // simply adds letter clicked to the activeRow and iterates row position by 1

        const newActiveRow = activeRow.slice();
        newActiveRow[currentRowPos] = {...boxStyleVariants.notEvaluated, key_letter: key_letter};
        setActiveRow(newActiveRow);
        setCurrRowPos(currentRowPos + 1);
    }



    return (
      <Fragment>
          <Box margin='auto'
            sx={{
                height: 600,
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
          >
              <TopBanner />
              <GuessArea boxes={allRows} />
              {gameOver.finished ? <MessageCenter gameOver={gameOver}
                                                  chosenWord={chosenWord} /> : <div/>}
              <Keyboard board={keyboard}
                        onClickCallback={keyboardClickCallback}
              />
          </Box>
      </Fragment>
  );
}


export default App;
