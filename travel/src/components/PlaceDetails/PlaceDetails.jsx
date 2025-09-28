import React, { useEffect } from 'react';
import{ Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';

const PlaceDetails = ({ place, selected, refProp, onCardClick  }) => {
    const classes = useStyles();
    
    
    if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      
    
   
    return (
    <Card elevation={6} >
        <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://cdn.vox-cdn.com/thumbor/Dy6WV2AqbJ1aiMtivZgIkY4rW1I=/0x0:3861x2574/1200x800/filters:focal(1623x979:2239x1595)/cdn.vox-cdn.com/uploads/chorus_image/image/58954053/BK_5.0.0.0.jpg'}
        title={place.name}
      />   
        <CardContent>
            <Typography gutterBottom variant="h5">{place.name}</Typography>
             <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
            </Box>
           
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Price</Typography>   
                 <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>   
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Ranking</Typography>   
                 <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>   
            </Box>
        {place?.awards?.map((award) => (
            <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                <img src={award.images.small} />
                <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
            </Box> 
            ))}
            {place?.cuisine?.map(({name}) =>(
                <Chip key={name} size="small" label={name} className={classes.chip}/>
            ))}
            {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )} 
        <CardActions>
            <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisor
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
             Website
            </Button>
        </CardActions>

        </CardContent> 
         
    </Card>        
    );
}

export default PlaceDetails;