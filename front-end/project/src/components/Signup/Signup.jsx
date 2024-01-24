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
import { Fragment,useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LoginSuccess } from '../../redux/actions/authActions';

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

export default function SignUpSide() {
  const [errors,setErrors] = useState({email:'',name:'',password:'',cpassword:''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const cpassword = formData.get('cpassword');
    let nameError = '';
    let emailError = '';
    let passwordError = '';
    let cpasswordError = '';
  
    // Username validation
    if (!name) {
      nameError = 'Username is required *';
    } else if (name.length < 4) {
      nameError = 'Username must be at least 4 characters *';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      nameError = 'Username can only contain letters *';
    }
  
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
    }
  
    // Confirm password validation
    if (!cpassword) {
      cpasswordError = 'Confirm password is required *';
    } else if (cpassword.length < 4) {
      cpasswordError = 'Confirm password must be at least 4 characters *';
    } else if (cpassword !== password) {
      cpasswordError = 'Passwords do not match *';
    }
  
    if (nameError || emailError || passwordError || cpasswordError) {
      setErrors({ name: nameError, email: emailError, password: passwordError, cpassword: cpasswordError });
    } else {
      // Proceed with form submission
      try {
        await axiosWithAuth.post('/signup', {
          username: name,
          email: email,
          password: password,
          cpassword: cpassword
        }).then((res) => {
          if (res.data.success) {
            localStorage.setItem('name',formData.get('name'))
            localStorage.setItem('token', res.data.token);
            dispatch(LoginSuccess(res.data.token));
            navigate('/');
          } else {
            setErrors({ name: res.data.nameError, email: res.data.emailError, password: res.data.password,cpassword: res.data.cpasswordError });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = ()=>{
    setErrors({name:'',email:'',password:'',cpassword:''})
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
              width:'70%',
              height:'auto',
              
            //   backgroundColor:'red'
            }}
          >
            <Avatar sx={{ mt: 5, bgcolor: 'blueviolet' }} >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{mb:5}}>
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1,  }}>
              <TextField sx={{mb:4}}
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={errors.name?errors.name:''}
                helperText={errors.name?errors.name:''}
                onChange={handleChange}
              />
              <TextField sx={{mb:4}}
                margin="normal"
                required
                fullWidth
                id="email"
                type='email'
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors.email?errors.email:''}
                helperText={errors.email?errors.email:''}
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
                error={errors.password?errors.password:''}
                helperText={errors.password?errors.password:''}
              />
              <TextField
              sx={{mb:5}}
                margin="normal"
                required
                fullWidth
                name="cpassword"
                label="Confirm password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
                error={errors.cpassword?errors.cpassword:''}
                helperText={errors.cpassword?errors.cpassword:''}
              />
                
              <Button
              
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2,backgroundColor:'blueviolet' }}
              >
                Sign Up
              </Button>
              <Grid container sx={{ display:'flex',justifyContent:'center'}}>
               
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already  have an account? Sign In"}
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