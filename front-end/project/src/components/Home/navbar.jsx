import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {decode} from 'jsonwebtoken'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, IconButton } from '@mui/material';
import axiosWithAuth from '../../axiosConfig';
import { logout } from '../../redux/actions/authActions';
import { jwtDecode } from 'jwt-decode';
function clickEvent() {

}

const defaultTheme = createTheme();

export default function Navbar() {
  const [userData, setUserData] = React.useState({})
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token);
  React.useEffect(() => {
    const data = jwtDecode(token)
    setUserData(data)
  }, [token])
  const HandleLogout = async (evt) => {


    localStorage.removeItem('name')
    localStorage.removeItem('token')
    dispatch(logout())
    window.location.href = '/login'
  }




  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none', color: 'green' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ backgroundColor: 'blueviolet', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h3" color="white" fontFamily={'fantasy'} noWrap sx={{ flexGrow: 1 }}>
            CAR ENTHUSIASTS
          </Typography>
          <nav>
            <Link
              fontFamily={'fantasy'}
              variant="h5"
              color="text.primary"
              href="/profile"
              sx={{
                width: 'auto',
                my: 2,
                mx: 10,
                color: 'whitesmoke',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ borderRadius: '50%', overflow: 'hidden', backgroundColor: '#D6A8D4', width: '50px', height: '50px' }}>

                {userData.img ? (
                  <img src={userData.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Avatar sx={{ marginRight: 1 ,width:'50px',height:'50px'}} />
                    
                    )}
                    </div>

              &nbsp;&nbsp;

              {token ? userData.name : 'Profile'}
            </Link>
          </nav>
          {
            token ? (
              <Button
                onClick={HandleLogout}
                href=""
                variant="outlined"
                sx={{ backgroundColor: 'red', color: 'whitesmoke', my: 1, mx: 1.5 }}
              >
                Logout
              </Button>
            ) : (
              <Button

                href="/login"
                variant="outlined"
                sx={{ backgroundColor: 'red', color: 'whitesmoke', my: 1, mx: 1.5 }}
              >
                Login
              </Button>
            )
          }

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
