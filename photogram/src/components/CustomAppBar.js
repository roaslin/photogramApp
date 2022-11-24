import { Grid, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './CustomAppBar.css';

const CustomAppBar = () => {
  return (
    <AppBar className='custom_appbar'>
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <Typography paddingY={1}>Photogram</Typography>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ float: 'right' }} paddingY={1}>
              <AddCircleOutlineIcon />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
