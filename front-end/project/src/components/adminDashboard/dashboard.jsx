import React, { useEffect, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axiosWithAuth from '../../axiosConfig';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';

const columns = [

    { width: 120, label: 'Image', dataKey: 'image' },
    { width: 120, label: 'Username', dataKey: 'username' },
    { width: 120, label: 'Email', dataKey: 'email' },
    { width: 120, label: 'Edit', dataKey: 'edit' },
    { width: 120, label: 'Delete', dataKey: 'delete' },
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed', fontFamily: 'fantasy' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (

        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align="left"
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell key={column.dataKey} align="left">
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

const UserTable = () => {
    const [originalData,setOriginalData] = useState([])
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axiosWithAuth.get('/dashboard')
            .then(response => {
                if (response.data.success) {
                    setOriginalData(response.data.user)
                    setUserData(response.data.user);
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);



    // if (userData.length === 0) {
    //     return <div>No data found</div>;
    // }

    

    const handleEdit = (userId) => {
        navigate('/edit',{
            state:{userId}
        })

    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // If the user clicks "Yes, delete it!" in the modal, proceed with the delete operation
                axiosWithAuth.post(`/delete?id=${userId}`).then((response) => {
                    if (response.data.success) {
                        window.location.reload();
                    } else {
                        console.log(response.data.error);
                    }
                });
            }
        });
        console.log(userId)
    };
    const handleSearch = (e)=>{
        const target = e.target.value
        if(target.length <1){
            setUserData(originalData)
        }
        axiosWithAuth.get(`/search?id=${target}`).then((res)=>{
            if(res.data.success){
                if(res.data.results.length < 1){
                    const Toast = Swal.mixin({
                        toast: false,
                        position: 'top-center',
                        showConfirmButton: false,
                        timer: 800,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        },
                      });
                      Toast.fire({
                        icon: 'warning',
                        title: 'No search found',
                      });
                }else{

                    setUserData(res.data.results)
                }
               
            }
        }).catch((err)=>{
            console.log(err);
        })
      }
  

    return (
        <>
            <TextField id="filled-basic" onChange={handleSearch} sx={{backgroundColor:'white',borderRadius:'10px', marginLeft:'40rem',width:'20rem',marginTop:'10px'}} label="Search" variant="filled" />
        <Paper style={{ height: '40rem', width: '100%', fontFamily: 'fantasy',marginTop:'10px' }}>
            <TableVirtuoso
                data={userData.map((user, index) => ({
                    image: user.image ? (
                        <img
                            src={user.image}
                            alt={`User ${index + 1}`}
                            width="50"
                            height="50"
                            
                            style={{objectFit:'cover', borderRadius: '50%', overflow: 'hidden' }}
                        />
                    ) : (
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                backgroundColor: 'black', // Set your desired background color
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff', // Set the text color
                            }}
                        >
            
                        </div>
                    ),
                    username: user.username,
                    email: user.email,
                    delete: <Button variant="outlined" color='error' onClick={() => handleDelete(user._id)} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>,
                    edit: <Button variant="contained" onClick={() => handleEdit(user._id)} color="success">Edit
                    </Button>
                }))}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
        </>
    );
};

export default UserTable;
