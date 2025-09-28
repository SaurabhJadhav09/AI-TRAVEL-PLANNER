import axios from 'axios';
 
export const getplacesData = async (type, sw, ne) => {
    try {
          const { data: { data }} = await axios.get( `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary` , { 
  params: {
    bl_latitude: sw.lat, 
    tr_latitude: ne.lat,
    bl_longitude: sw.lng,
    tr_longitude: ne.lng,
},
headers: {
    'X-RapidAPI-Key': '6b4fb2f803mshe2d39ff3e77466cp1a4ceajsn73b0542677b4',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
 });
            
 
      return data;
    } catch (error) {
      console.log(error);

    } 
}; 