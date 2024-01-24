import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {jwtDecode} from 'jwt-decode'
import Swal from 'sweetalert2';
import {
  Box,
  Typography,
  Avatar,
  Input,
  Container,
  Button,
  Grid,
  TextField,
  SvgIcon,
  IconButton,

} from '@mui/material';
import { red } from '@mui/material/colors';
import AddBoxIcon from '@mui/icons-material/AddBox'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { jwtDecode } from 'jwt-decode';
import axiosWithAuth from '../../axiosConfig';
import { updateToken } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router';
const ProfileView = () => {

  const [userData, setUserData] = useState({});
  const [value, setValue] = useState('')
  const [evalue, setEvalue] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputFile = useRef(null);
  const [image,setImage] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {

    if (token) {
      const data = jwtDecode(token)
      console.log(data);
      setUserData(data)
      setValue(data.name)
      setEvalue(data.email)
      setImage(data.img)
    }
  }, [token])


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

  };
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleEchange = (e) => {
    setEvalue(e.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('id',userData.id)
    data.append('image', selectedImage);
    try {
      await axiosWithAuth.post('/edit', data).then((res) => {
        if (res.data.success) {
          localStorage.setItem('token', res.data.token)
          dispatch(updateToken(res.data.token))
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Profile updated successfully',
          });

        } else {
          console.log(res.data.error);
        }
      })
    } catch (err) {
      console.log(err);
    }

  }


  return (

    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box flex={1} width="80%" display="flex" flexDirection="column" justifyContent='center' gap={5}>
        <Box width='50rem' borderRadius='10px' boxShadow='0px 1px 1px 1px' height='50rem' >
        <IconButton onClick={() => navigate('/')}>
                <SvgIcon component={CloseRounded} />
              </IconButton>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container direction="column" alignItems="center" p={5} spacing={3}>
              <div style={{ borderRadius: '50%', overflow: 'hidden', backgroundColor: '#D6A8D4', width: '120px', height: '120px' }}>

                {userData.img ? (
                  <img src={userData.img} alt="pro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  
                <img src='' alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <Grid container direction="column" gap={3} justifyContent='space-evenly' alignItems="center">
                <Typography fontWeight="bold" color="black" variant="h5">
                  {userData.name}
                </Typography>

              </Grid>
            </Grid>
            <Grid container direction="column" justifyContent='center' alignItems='center' gap={3}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
                style={{ display: 'none' }}
                ref={inputFile}
              // name='image'
              />
              <IconButton onClick={() => inputFile.current.click()}>
                <SvgIcon component={AddBoxIcon} />
              </IconButton>

              <TextField
                label="User Name"
                variant="outlined"
                value={value}
                name='name'
                placeholder={value}
                onChange={handleChange}
                fullWidth
                sx={{ width: '80%' }}
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name='email'

                sx={{ width: '80%', color: 'red' }}
                value={evalue}
                onChange={handleEchange}
                placeholder={evalue}
              />
              <TextField
                label="Old Password"
                variant="outlined"
                name='password'
                fullWidth
                sx={{ width: '80%' }}
              />
              <TextField
                label="New Password"
                variant="outlined"
                name='npassword'
                fullWidth
                sx={{ width: '80%' }}
              />
            </Grid>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                sx={{ marginTop: '2rem' }}
                variant="contained"
                color="primary"
                size="large"
              >
                Update Profile
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileView;
