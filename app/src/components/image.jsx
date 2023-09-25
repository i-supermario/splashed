import { Button, CardMedia, Container, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Context } from "../pages/App";


const theme = createTheme({
  palette: {
    brightRed: {
      main: '#ff0000',
      color:'#ff0000',
    },
  },
});



function Image(props){
    const [view,setView] = useState('none')
    const [brightness,setBrightness] = useState('brightness(100%)')
    const context = useContext(Context)

    return(
        <>
            {/* <Card sx={{borderRadius:'15px'}} > */}
              <Container
                onMouseOver={()=>{
                  setView('block');
                  setBrightness('brightness(30%)')
                }}
                onMouseOut={()=>{
                  setView('none');
                  setBrightness('brightness(100%)')
                }} 
                disableGutters sx={{ 
                  position: "relative",
                  borderRadius:'15px',
                  zIndex:'0' }}>
                <CardMedia 
                
                sx={{
                  width:'100%',
                  height:'auto',
                  borderRadius:'15px',
                  filter:brightness
                }} 
                component="img" 
                image={props.src}/> 
                <ThemeProvider theme={theme}>
                  <Button variant="outlined" color="brightRed" 
                  onClick={()=>{
                    context.delete.setView('flex');
                    context.setOverlayView('overlayed')
                    context.delete.setDeleteId(props.id)
                  }}
                  sx={{
                    display:view,
                    position:'absolute',
                    top:'5%',left:'70%',
                    borderRadius:'30px',
                    borderColor:'#ff0000'}}>
                    delete
                  </Button>
                </ThemeProvider>
                {/* transform: "translateX(-50%)", */}
                
                <Typography sx={{
                  display:view,
                  position:'absolute',
                  top:'80%',
                  left:'10%',
                  fontWeight:'700',
                  color:'white'
                  }} variant="caption">
                    {props.label}
                </Typography>
              </Container>
            {/* </Card> */}
        </>
    )
}
export default Image;
