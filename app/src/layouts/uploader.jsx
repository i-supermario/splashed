import { Button, Container, TextField, Typography, useStepContext } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../pages/App";

function Uploader(props){

    const context = useContext(Context);

    const [tfLabel,setTfLabel] = useState('')
    const [tfURL,setTfURL] = useState('')

    function handleSubmit(evt){
        console.log("uploading")
        context.upload.setView('none');
        context.setOverlayView('')
        fetch('http://localhost:3001/app/post', {
            Accept: 'application/json',
            method: 'post',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                label: tfLabel,
                url: tfURL
               }),
           })
           .then((res)=>{
            console.log(res)
            context.fetchImages()
            setTfLabel('')
            setTfURL('')
           })
           .catch((error)=>{
            console.log(error.message)
           })
    }

    return(
        <>
            <Container disableGutters sx={{
                display:props.view,
                flexDirection:'column',
                justifyContent:'space-around',
                rowGap:'15px',
                position:'sticky',
                width:'min-content',
                borderRadius:'10px',
                backgroundColor:'white',
                padding:'15px',
                // zIndex:'5'
                
            }}>
                <Typography variant="h5">
                    Add a new photo
                </Typography>
                <Container disableGutters sx={{display:'flex',flexDirection:'column'}}>
                    <Typography variant="caption" sx={{fontWeight:'600',fontSize:'15px'}}>
                        Label
                    </Typography>
                    <TextField variant="outlined" size="small" sx={{width:'450px'}} placeholder="add a label" value={tfLabel} onChange={(evt)=>{setTfLabel(evt.target.value)}}/>
                </Container>
                <Container disableGutters sx={{display:'flex',flexDirection:'column'}}>
                    <Typography variant="caption" sx={{fontWeight:'600',fontSize:'15px'}}>
                        Photo URL
                    </Typography>
                    <TextField variant="outlined" size="small" sx={{width:'450px'}} placeholder="add URL" value={tfURL} onChange={(evt)=>{setTfURL(evt.target.value)}} />
                </Container>
                <Container disableGutters sx={{display:'flex',justifyContent:'flex-end',columnGap:'10px'}}>
                    <Button onClick={()=>{
                        context.upload.setView('none');
                        context.setOverlayView('')
                    }} 
                    sx={{color:'gray'}}>
                        Cancel
                    </Button>
                    <Button onClick={(evt)=>{
                        handleSubmit(evt)
                    }} 
                    variant="contained" sx={{
                        backgroundColor:'#00cc7a',
                        width:'min-content',
                        height:'40px',
                        textAlign:'center',
                        fontSize:'15px',
                        color:'white',
                        borderRadius:'12px'
                    }}>
                        Submit
                    </Button>
                </Container>
            </Container>
        </>
    )
}
export default Uploader;