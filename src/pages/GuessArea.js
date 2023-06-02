import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import {Grid, Typography} from "@mui/material";

const config = {
    numBoxesPerRow: 5,
    numRows: 6,
    widthOfABox: 50,
    heightOfABox: 50,
    gapBetweenBoxes: 10,
    initialBackgroundColor: 'white',
};

const LetterBox = (props) => {
    // Represent a box into which a letter may be displayed.
    // In this version, we display the value of "index"
    // in the box.

    const {attributes} = props;
    console.log("here is attributes");
    console.log(attributes);


    return (
        <Box sx={{
            width: config.widthOfABox,
            height: config.heightOfABox,
            border: 1,
            ...attributes,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant='h4' sx={{fontWeight: 'bold', color: attributes.color }}>
                {attributes.key_letter ? attributes.key_letter: ''}
            </Typography>

        </Box>
    )
}

const GuessArea = (props) => {

    const {boxes} = props;
    //console.log(guessAreaboxes);


        return (
            <Fragment>
                <Grid  container columns={config.numBoxesPerRow}
                       sx={{
                           width: config.numBoxesPerRow * config.widthOfABox +
                                    (config.numBoxesPerRow - 1) * config.gapBetweenBoxes,
                       }}
                >
                {
                    boxes.map((element) =>
                        <Grid item

                              xs={1}
                              sx={{mb: 0.8}}
                        >
                            <LetterBox attributes={element} />
                        </Grid>
                    )
                }
                </Grid>
            </Fragment>
        )
    }



export default GuessArea;