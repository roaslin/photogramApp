import { Button, Grid, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './CustomAppBar.css';

const CustomAppBar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

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
              <Button onClick={logOut}>
                <LogoutIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
