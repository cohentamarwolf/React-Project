import { useContext, useState, useEffect } from "react"
import { MeetingContext } from './Home';
import Button from '@mui/joy/Button';
import { Alert } from '@mui/material';
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { useForm } from 'react-hook-form';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import service from '../../data/service ';
import meeting from '../../data/meeting '
import EventIcon from '@mui/icons-material/Event';
import { observer } from "mobx-react-lite";

const AddMeeting = observer(() => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [isDateAvailable, setIsDateAvailable] = useState(true);
    const [selectedService, setSelectedService] = useState("");
    const setOpen = useContext(MeetingContext).setOpen;
    const update = async (data) => {
        try {
            const status = await meeting.postMeeting(data);
            console.log(status);
            if (status === 200) {
                // Close the dialog if the meeting is added successfully
                setOpen(false);
                reset();
            }
        } catch (error) {
            setIsDateAvailable(false);
            setValue('dateTime', '');
            console.log("aaaaa");
        }
    };

    return (<form onSubmit={handleSubmit(update)}>
        <Card
            data-resizable
            sx={{
                textAlign: 'center',
                alignItems: 'center',
                width: 343,
                // to make the demo resizable
                overflow: 'auto',
                resize: 'horizontal',
                '--icon-size': '100px',
            }}
        >
            <CardOverflow sx={{ color: 'black' }}>
                <AspectRatio
                    variant="outlined"
                    ratio="1"
                    sx={{
                        m: 'auto',
                        transform: 'translateY(50%)',
                        borderRadius: '50%',
                        width: 'var(--icon-size)',
                        boxShadow: 'sm',
                        bgcolor: 'background.surface',
                        position: 'relative',
                    }}
                >
                    <div>
                        <EventIcon color="primary" sx={{
                            color: '#B47F31',
                            fontSize: '4rem'
                        }}></EventIcon>
                    </div>
                </AspectRatio>
            </CardOverflow>
            <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size)/2)' }}>
                Fill the business details
            </Typography>
            <CardContent sx={{ maxWidth: '40ch' }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <FormLabel>serviceName</FormLabel>
                    <Select sx={{ height: 40 }}
                        defaultValue={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        {...register("serviceName")}
                        required
                    >
                        <MenuItem value="">None</MenuItem>
                        {service.servicesList.map((object, index) => (
                            <MenuItem key={index} value={object.name}>{object.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl >
                    <FormLabel>client Name</FormLabel>
                    <Input
                        endDecorator={<PersonIcon sx={{
                            color: '#B47F31',
                        }} />}
                        {...register("clientName")}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input

                        type="tel"
                        endDecorator={<PhoneIcon sx={{
                            color: '#B47F31',
                        }} />}
                        {...register("clientPhone")}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        type="email"
                        endDecorator={<EmailIcon sx={{
                            color: '#B47F31',
                        }} />}
                        {...register("clientEmail")}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="datetime-local"
                        {...register("dateTime")}
                        required
                    />
                    {!isDateAvailable && (
                        <Alert severity="error" sx={{ marginBottom: 2 }}>
                            Appointment is not available! Please choose a different date and time.
                        </Alert>)}
                </FormControl>
                <CardActions
                    orientation="vertical"
                    sx={{
                        '--Button-radius': '40px',
                        width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                    }}
                >
                    <Button style={{ backgroundColor: '#B79C89', color: "white", width: "100%" }} variant="solid" color="primary" type="submit">
                        Save
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    </form>)
});
export default AddMeeting;


