import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
const data = [
    {
        avatar:'B',
        title:'BMW M5 CS',
        imageUrl:'https://images.hgmsites.net/med/2021-bmw-5-series_100749425_m.jpg',
        text:'CS stands for Competition Sport. An abbreviation that only select BMW M automobiles are allowed to bear.',

    },
    {
        avatar:'L',
        title:'Lamborgini Revuolto',
        imageUrl:'https://www.carscoops.com/wp-content/uploads/2023/07/Lamborghini-Revuelto.jpg',
        text:'There are plenty of nods to the past, but unlike any bull before it, the Revuelto is a plug-in hybrid.',

    },
    {
        avatar:'B',
        title:'BMW i7 Legend',
        imageUrl:'https://cdni.autocarindia.com/ExtraImages/20230417070438_i7_M70.jpg',
        text:'There are plenty of nods to the past, but unlike any bull before it, the Revuelto is a plug-in hybrid.',

    },
    {
        avatar:'LC',
        title:'Land Cruicer Prado',
        imageUrl:'https://cdn.motor1.com/images/mgl/KbBG4l/s1/2024-toyota-land-cruiser-prado-rendering.jpg',
        text:'There are plenty of nods to the past, but unlike any bull before it, the Revuelto is a plug-in hybrid.',

    },
    

]


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home() {
    

  

  return (
    <div style={{width:'100%',height:'40rem',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        {
            data.map((item)=>(

    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
            {item.avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${item.title}`}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={`${item.imageUrl}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color='error' />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon color='primary' />
        </IconButton>
      </CardActions>
      
    </Card>
            ))
        }
    
    </div>
  );
}