import Grid from '@mui/material/Grid';
import Service from "./Service"
import { observer } from "mobx-react-lite";
import service from '../../data/service ';
const allServices = observer(() => {
    return (<>
        <Grid container spacing={2}sx={{display:"flex" ,justifyContent:"space-between"}} >
            {service.servicesList.map((object, index) => (
                <Grid item key={index}>
                    <Service s={object} />
                </Grid>
            ))}
        </Grid>
        
    </>)
});
export default allServices;

