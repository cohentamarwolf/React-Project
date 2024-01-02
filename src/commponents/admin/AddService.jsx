import TextField from '@mui/material/TextField';
import React from 'react';
import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { CloseContext } from './AdminHome';
import service from '../../data/service ';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import IconButton from '@mui/joy/IconButton';

export default function AddMeeting() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const setCloseContext = useContext(CloseContext).setAnchorElUser;
    const [isServiceAvailable, setIsServiceAvailable] = useState(true);
    const update = async (data) => {
        try {
            const status = await service.postService(data);
            console.log(status);
            if (status === 200) {
                // Close the dialog if the meeting is added successfully
                setCloseContext(null);
                setIsServiceAvailable(true);
                reset();
            }
        } catch (error) {
            setIsServiceAvailable(false);
            setValue('name', '');
            //focus
        }
    };
    const inputStyle = {
        width: '25ch',
        height: '3rem', // גובה חדש ל-Input
        marginBottom: '1rem', // מרווח בין ה-Inputs
    };
    return (<>

        <form onSubmit={handleSubmit(update)}>
            {!isServiceAvailable && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    Service is available!
                </Alert>)}
            <Box
                sx={{
                    '& .MuiTextField-root': {
                        m: 0.75,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    },
                    //      display: 'flex', flexWrap: 'wrap',
                    // flexDirection: "column"
                }}
            // noValidate
            // autoComplete="off"


            >
                <FormControl sx={inputStyle}>
                    <TextField
                        id="outlined-textarea"
                        label="Service Name"
                        multiline
                        required
                        {...register("name")}
                    />
                </FormControl>
                <FormControl sx={inputStyle} >
                    <TextField
                        required
                        id="outlined-textarea"
                        label="Description"
                        multiline
                        {...register("description")}

                    />
                </FormControl>
                <FormControl sx={inputStyle}>
                    <TextField
                        required
                        id="outlined-textarea"
                        label="Price"
                        multiline
                        type="number"
                        inputMode="numeric"
                        {...register("price")}

                    />

                </FormControl>
                <FormControl sx={inputStyle}>
                    <TextField
                        required
                        id="outlined-textarea"
                        label="Duration"
                        type="number"
                        multiline
                        inputMode="numeric"
                        {...register("duration")}
                    />
                </FormControl>
                <FormControl sx={inputStyle}>
                    <TextField
                        id="outlined-textarea"
                        label="Image"
                        multiline
                        required
                        {...register("image")}
                    />
                </FormControl>
                <br /><br />
            </Box>
            <IconButton
                type="submit"
                aria-label="Like minimal photography"
                size="md"
                variant="solid"
                // color="primary"
                sx={{
                    bgcolor:'#B47F31',
                    color: 'white',
                    position: 'absolute',
                    borderRadius: '50%',
                    right: '7rem',
                    bottom: 0,
                }}
            >
                <PlaylistAddCheckIcon></PlaylistAddCheckIcon>
            </IconButton>
        </form>
    </>);
};















