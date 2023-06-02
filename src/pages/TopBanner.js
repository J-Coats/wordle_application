import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{width: 1900, mt: 1, mb: 5, borderBottom: 1}} >
            <Typography variant='h3' textAlign="center" font="Clear Sans, Helvetica Neue, Arial, sans-serif"
                        fontWeight={400}>
                Wordle
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;