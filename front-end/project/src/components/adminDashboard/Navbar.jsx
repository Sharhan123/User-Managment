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
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { Avatar, IconButton } from '@mui/material';
import axiosWithAuth from '../../axiosConfig';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router';
const defaultTheme = createTheme();

export default function Navbar() {
    const navigate = useNavigate()
    const logout =()=>{
        localStorage.removeItem('admin')
        navigate('/admin')
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none', color: 'green' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ backgroundColor: 'rgb(0, 22, 95)', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h3" color="white" fontFamily={'fantasy'} noWrap sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <nav>
                        <Link
                            fontFamily={'fantasy'}
                            variant="h5"
                            color="text.primary"
                            sx={{
                                width: 'auto',
                                my: 2,
                                mx: 10,
                                color: 'whitesmoke',
                                textDecoration: 'none',
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                            }}
                        >
                           
                            <Button
                                
                                sx={{ marginLeft:'5rem' }}
                                variant="contained"
                                color="success"
                                size="large"
                                href='/add'
                            >
                                Add
                            </Button>
                            <Button
                                
                                sx={{ marginLeft:'5rem' }}
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={logout}
                            >
                                Logout
                            </Button>

                           

                            &nbsp;&nbsp;

                        </Link>
                        
                    </nav>


                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
