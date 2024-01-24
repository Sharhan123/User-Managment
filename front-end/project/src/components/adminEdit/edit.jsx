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
import CloseRounded from '@mui/icons-material/CloseRounded'
import axiosWithAuth from '../../axiosConfig';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
const EditForm = () => {
    const [userData, setUserData] = useState([])
    const [evalue, setEvalue] = useState('')
    const [nvalue, setNvalue] = useState('')
    const location = useLocation();
    const { userId } = location.state;
    const navigate = useNavigate()
    useEffect(() => {
        console.log(userId)
        axiosWithAuth.get(`/editGet?id=${userId}`).then((res) => {
            if (res.data.success) {
                console.log(res.data.user)
                setUserData(res.data.user)
                setEvalue(res.data.user.email)
                setNvalue(res.data.user.username)
            } else {
                console.log(res.data.error);
            }
        })
    }, [])

    const handleEchange = (e) => {
        setEvalue(e.target.value)
    }
    const handleChange = (e) => {
        setNvalue(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        const form = event.currentTarget
        const data =  new FormData(form);
         console.log(data);
        data.append('id', userData._id)
        await axiosWithAuth.post('/editAdmin',{
            email:evalue,
            name:nvalue,
            id:userId
        }).then((res)=>{
            if(res.data.success){
                navigate('/dashboard')
            }else{
                console.log('error occured');
            }
        })


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
                <Box width='50rem' borderRadius='10px' boxShadow='0px 1px 1px 1px' height='30rem' >
                    <IconButton onClick={() => navigate('/dashboard')}>
                        <SvgIcon component={CloseRounded} />
                    </IconButton>
                    <form onSubmit={handleSubmit} >
                        <Grid container direction="column" alignItems="center" p={5} spacing={3}>
                            <div style={{ borderRadius: '50%', overflow: 'hidden', backgroundColor: '#D6A8D4', width: '120px', height: '120px' }}>

                                {userData.image ? (
                                    <img src={userData.image} alt="pro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (

                                    <img src='' alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>
                            <Grid container direction="column" gap={3} justifyContent='space-evenly' alignItems="center">
                                <Typography fontWeight="bold" color="black" variant="h5">
                                    {userData.username}
                                </Typography>

                            </Grid>
                        </Grid>
                        <Grid container direction="column" justifyContent='center' alignItems='center' gap={3}>


                            <TextField
                                label="User Name"
                                variant="outlined"
                                name='name'
                                value={nvalue}
                                placeholder={nvalue}
                                onChange={handleChange}
                                fullWidth
                                sx={{ width: '80%' }}
                            />
                            <TextField
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                sx={{ width: '80%', color: 'red' }}
                                name='email'
                                value={evalue}
                                onChange={handleEchange}
                                placeholder={evalue}
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

export default EditForm;
