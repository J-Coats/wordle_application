import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";



const Letterbox = (props) => {

    const {attributes} = props;
    console.log("letter attributes");
    console.log(attributes);

    if (attributes.key_letter === 'Del') {
        return (
            <Box sx = {{
                width: 60,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...attributes,
                borderRadius: 1,

            }
            }>
                {attributes.key_letter}
            </Box>
        )
    }
    else if (attributes.key_letter === 'Enter'){
        return (
            <Box sx = {{
                width: 70,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...attributes,
                borderRadius: 1,

            }
            }>
                {attributes.key_letter}
            </Box>
        )

    } else {
        return (
            <Box sx = {{
                width: 40,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...attributes,
                borderRadius: 1

            }
            }>
                {attributes.key_letter}
            </Box>
        )
    }
}


const Keyboard = (props) => {

    const {board, onClickCallback} = props;

    // separate entire keyboard into the 3 separate rows of keys
    let row1 = [];
    for (let i = 0; i < 10; i += 1)
        row1.push(board[i]);

    let row2 = [];
    for (let i = 10; i < 19; i += 1)
        row2.push(board[i]);

    let row3 = [];
    for (let i = 19; i < board.length; i += 1)
        row3.push(board[i]);


    //console.log(row1);
    //console.log(row2);
    //console.log(row3);



    return (
        <Fragment>
            <Grid container columns={10}
                  sx={{
                      pt: 1,
                      alignItems: 'center',
                      fontWeight: 700
            }}>
                {
                    row1.map((attributes) =>
                        <Grid item
                            xs={1}
                            sx={{mb: 1}}
                            onClick={() => onClickCallback(attributes)}
                        >
                            <Letterbox attributes={attributes}/>
                        </Grid> )

                }
            </Grid>

            <Grid container columns={10}
                  sx={{
                      alignItems: 'center',
                      paddingLeft: 4,
                      fontWeight: 700
                  }}>
                {
                    row2.map((attributes) =>
                        <Grid item
                              xs={1}
                              sx={{mb: 1}}
                              onClick={() => onClickCallback(attributes)}
                        >
                            <Letterbox attributes={attributes}/>
                        </Grid> )

                }
            </Grid>

                <Grid container columns={10}
                      sx={{
                          fontWeight: 700
                      }}>
                    {
                        row3.map((attributes) =>
                            <Grid item
                                  sx={{mb: 1}}
                                  paddingLeft={1}
                                  onClick={() => onClickCallback(attributes)}
                            >
                                <Letterbox attributes={attributes}/>
                            </Grid> )

                    }
                </Grid>
        </Fragment>
    )


}

export default Keyboard;

