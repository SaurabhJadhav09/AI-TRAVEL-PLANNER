import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';


import useStyles from './style';
import { LocationOnOutlined } from '@material-ui/icons';



const Map = ({ setCoordinates, setBounds, coordinates, places ,setChildClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    const handleCardClick = (index) => {
        console.log('Marker clicked: ${index}');
        setChildClicked(index); // Update the selected card index in the List component
      };

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBgeThmTc8Dv5wvNn2DZg-Qza2I14X7g_s' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    console.log(e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => handleCardClick(child)}
             >
                {places?.map ((place, i) =>(
                        <div
                            className={classes.markerContainer}
                            lat={Number(place.latitude)}
                            lng={Number(place.longitude)}
                            key={i}
                            onClick={() => handleCardClick(i)} // Handle card click on the map
                       > 
                       {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper} >
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://cdn.vox-cdn.com/thumbor/Dy6WV2AqbJ1aiMtivZgIkY4rW1I=/0x0:3861x2574/1200x800/filters:focal(1623x979:2239x1595)/cdn.vox-cdn.com/uploads/chorus_image/image/58954053/BK_5.0.0.0.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />

                                </Paper>

                            )
                        }
                        
                        </div>
                    ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;

                
