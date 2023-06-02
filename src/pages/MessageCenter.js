import React, {Fragment} from 'react';
import {Typography, Box} from '@mui/material';

const MessageCenter = (props) => {
    const {gameOver} = props;
    const {chosenWord} = props;
    console.log(chosenWord);

    return (
        <Fragment>
            <Box sx={{mt: 5, mb: 5}}>
                <Typography variant='h5'
                            align="center">
                    {gameOver.result ? <div> You won, Impressive! </div> : <div>
                        You lost! The word was {chosenWord}. </div>}
                </Typography>
            </Box>
        </Fragment>
    )
}

export default MessageCenter;