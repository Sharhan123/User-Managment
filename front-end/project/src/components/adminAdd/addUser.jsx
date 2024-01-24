import * as React from 'react';
import axiosWithAuth from '../../axiosConfig';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Add() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data ={
            Name:name,
            Email:email,
            Password:password
        }
      console.log(data)
        axiosWithAuth.post('/add',data ).then((res) => {
          if (res.data.success) {
            navigate('/dashboard');
          }
        });
      };

    const handleChange = (e)=>{
        setName(e.target.value)
    }
    const handleChangee = (e)=>{
        setEmail(e.target.value)
    }
    const handleChangep = (e)=>{
        setPassword(e.target.value)
    }

   
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', }}>
                <CssBaseline />

                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            borderRadius: '5px',
                            boxShadow: '1px 1px 1px 1px',
                            my: 15,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '70%',
                            height: 'auto',
                

                            //   backgroundColor:'red'
                        }}
                    >

                        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                            Add User
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, }}>
                            <TextField sx={{ mb: 4 }}
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="User Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField sx={{ mb: 4 }}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                type='email'
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                               onChange={ handleChangee}
                            />
                            <TextField
                                sx={{ mb: 5 }}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChangep}
                            />

                            <Button

                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 5, mb: 2, backgroundColor: 'blueviolet' }}
                            >
                                Add
                            </Button>
                            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

                                <Grid item>
                                </Grid>
                            </Grid>
                            {/* <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}