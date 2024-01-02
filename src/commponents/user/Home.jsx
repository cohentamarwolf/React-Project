import * as React from 'react';
import BusinessDetails from "../public/businessDetails"
import AllServices from "../public/AllServices"
import { useContext, useEffect, useState, createContext } from "react";
import { IsAdminContext } from "../../App";
import IconButton from '@mui/joy/IconButton';
import AddMeeting from '../user/AddMeeting';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const MeetingContext = createContext(null);
export default function Home() {
    const setAdmin = useContext(IsAdminContext).setIsAdmin;
    const [open, setOpen] = useState(false);
    const meetingContext = { open, setOpen }
    useEffect(() => {
        setAdmin(false);
    });
    return (<>
        <BusinessDetails></BusinessDetails><br /><br />
        <AllServices></AllServices><br /><br />
        <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color=""
            sx={{
                '& .MuiIconButton-root': {
                    width: '100px',
                    height: '100px',
                },
                color: '#B47F31',
                position: 'absolute',
                zIndex: 2,
                borderRadius: '50%',
                right: '0.5%',
                top: '57%', // Position from the top
                transform: 'translateY(-130%)', // Center vertically
            }}
            onClick={() => setOpen(true)}
        >
            <AddBusinessIcon sx={{ width: '10vw', height: '10vh' }} />
        </IconButton>
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent id="alert-dialog-slide-description" style={{ padding: 0, margin: 0 }}>
                    <MeetingContext.Provider value={meetingContext}>
                        <AddMeeting />
                    </MeetingContext.Provider>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    </>)
}