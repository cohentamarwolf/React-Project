import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import UpdateDetails from '../admin/updateDetails';
import { useState, createContext, useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { IsAdminContext } from '../../App';
import business from '../../data/business';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const UpdateContext = createContext(null);

const BusinessDetails = observer(() => {
    const isAdmin = useContext(IsAdminContext).isAdmin;
    const setIsAdmin = useContext(IsAdminContext).setIsAdmin;
    const [open, setOpen] = useState(false);
    const updateContext = { open, setOpen }
    return (
        <>
            <Box
                sx={{
                    width: '80vw',
                    position: 'relative',
                    overflow: { xs: 'auto', sm: 'initial' },
                }}
            >
                <Card
                    orientation="horizontal"
                    sx={{
                        backgroundColor: '#FFFAF4',
                        width: '80vw',
                        flexWrap: 'wrap',
                        [`& > *`]: {
                            '--stack-point': '500px',
                            minWidth:
                                'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
                        },
                        overflow: 'auto',
                        resize: 'horizontal',
                    }}
                >
                    <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
                        <img
                            src={business.business.logo}
                            srcSet={business.business.logo}
                            loading="lazy"
                            alt=""
                            sx={{ width: "100%", maxHeight: "100%" }}
                        />
                    </AspectRatio>
                    <CardContent >
                        <Typography fontSize="xl" fontWeight="lg" sx={{height:'10.5vh'}} >
                            <h2>{business.business.name}</h2>
                        </Typography>
                        <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                            {business.business.owner}
                        </Typography>
                        <Sheet
                            sx={{
                                bgcolor: 'background.level1',
                                borderRadius: 'sm',
                                p: 1.5,
                                my: 1.5,
                                display: 'flex',
                                gap: 2,
                                '& > div': { flex: 1 },

                            }}
                        >
                            <div>
                                <Typography level="body-xs" fontWeight="lg">
                                    <HomeIcon />
                                </Typography>
                                <Typography fontWeight="lg">
                                    {business.business.address}
                                </Typography>
                            </div>
                            <div>
                                <Typography level="body-xs" fontWeight="lg">
                                    <PhoneIcon />
                                </Typography>
                                <Typography fontWeight="lg">
                                    {business.business.phone}
                                </Typography>
                            </div>
                            <div>
                                <Typography level="body-xs" fontWeight="lg">
                                    <EmailIcon />
                                </Typography>
                                <Typography fontWeight="lg">
                                    {business.business.description}
                                </Typography>
                            </div>
                        </Sheet >
                        <Box sx={{ borderRadius: 'sm', backgroundColor: '#B79C89', display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                            {isAdmin && <Button variant="solid"
                                style={{ backgroundColor: '#555E68', color: "white", width: "100%" }}
                                onClick={() => setOpen(true)}>
                                Update
                            </Button >}
                            {!isAdmin && <Button variant="solid" style={{ backgroundColor: '#B79C89' }}>
                                <Link to="/login" style={{ backgroundColor: '#B79C89', color: "white", width: "100%" }}>Login for admin</Link>
                            </Button>}
                        </Box>
                    </CardContent>
                </Card>
                <React.Fragment>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setOpen(false)}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Edit the business details"}
                        </DialogTitle>
                        <DialogContent>
                            <UpdateContext.Provider value={updateContext}>
                                <UpdateDetails />
                            </UpdateContext.Provider>
                        </DialogContent>
                    </Dialog>

                </React.Fragment>
            </Box >
        </>
    );
});
export default BusinessDetails;
