import * as React from 'react';
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
import { Fragment } from 'react';
import { useNavigate } from 'react-router';
import axiosWithAuth from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { LoginSuccess } from '../../redux/actions/authActions';
import { useState } from 'react';
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

export default function SignInSide() {
  const [errors,setErrors] = useState({email:'',password:''})
  const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('password');
      let emailError = '';
      let passwordError = '';
    
      // Email validation
      if (!email) {
        emailError = 'Email is required *';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError = 'Invalid email address *';
      }
    
      // Password validation
      if (!password) {
        passwordError = 'Password is required *';
      } else if (password.length < 4) {
        passwordError = 'Password must be at least 4 characters *';
      } else if (/\s/.test(password)) {
        passwordError = 'Password must not contain spaces *';
      }
    
      if (emailError || passwordError) {
        setErrors({ email: emailError, password: passwordError });
      } else {
        // Proceed with form submission
        try {
          await axiosWithAuth.post('/signin', {
            email: email,
            password: password
          }).then((res) => {
            if (res.data.success) {
              console.log(res.data);
              localStorage.setItem('name',res.data.name)
              localStorage.setItem('token', res.data.token);
              dispatch(LoginSuccess(res.data.token));
              navigate('/');
            } else {
              setErrors({email:res.data.error,password:res.data.perror})
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    };


    const handleChange = ()=>{
      setErrors({email:'',password:''})
    }

  return (
    <ThemeProvider  theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',    }}>
        <CssBaseline />
        
        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square sx={{ display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
          <Box
            sx={{
                borderRadius:'5px',
                boxShadow:'1px 1px 1px 1px',
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent:'center',
              alignItems: 'center',
              width:'100vb',
              height:'auto',
            //   backgroundColor:'red'
            }}
          >
            <Avatar sx={{ mt: 5, bgcolor: 'blueviolet' }} >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{mb:5}}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1,  }}>
              <TextField sx={{mb:5 }}
                margin="normal"
                required 
                fullWidth
                type='email'
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors.email?true:''}
                helperText={errors.email?errors.email:''}
                onChange={handleChange}
                // helperText='nothing'
              />

              <TextField
              sx={{mb:5}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password?true:''}
                helperText={errors.password?errors.password:''}
                onChange={handleChange}
              />
                
              <Button
              
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2,backgroundColor:'blueviolet' }}
              >
                Sign In
              </Button>
              <Grid container sx={{ display:'flex',justifyContent:'center'}}>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
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