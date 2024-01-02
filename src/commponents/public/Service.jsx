import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

export default function Service({ s }) {

    const serviceData = s;
    return (
        <Card variant="outlined" sx={{ width: "17vw", height: "40vh" }}>
            <CardOverflow>
                <AspectRatio ratio="2">
                    <img
                        src={s.image}
                        srcSet={s.image}
                        // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent >
                <Typography level="title-md">
                    {serviceData.name}
                </Typography>
                <Typography level="body-sm">
                    {serviceData.description}
                </Typography>
            </CardContent>
            <CardOverflow variant="soft"  sx={{backgroundColor:'#B79C89'}} >
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                    <Typography level="body-xs">
                        <b>price: </b>{serviceData.price}$
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography level="body-xs">
                        <b>duration: </b>{serviceData.duration} minutes
                    </Typography>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}
