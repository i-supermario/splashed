import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../pages/App";
const PASSWORD = "bruh"

function Delete(props){

    const context = useContext(Context)
    const [password,setPassword] = useState('')
    const [passwordWrong,showPasswordWrong] = useState('none')

    async function handleClick(){
        // console.log(PASSWORD)
        // console.log(password)
        console.log("handle delete")
        if(PASSWORD===password){
            showPasswordWrong('none')
                await fetch(`http://localhost:3001/app/delete/${props.deleteId}`,
                {
                    method:"DELETE"
                }
            )
            .then(()=>{
                console.log("deleted successfully")
                context.delete.setView('none');
                context.setOverlayView('')
                context.fetchImages()
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        else{
            console.log("Wrong Password")
            showPasswordWrong('block')
        }
        setPassword('')

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
                <Container disableGutters sx={{display:'flex',flexDirection:"row",justifyContent:'space-between'}}>
                    <Typography variant="h5">
                        Are you sure?
                    </Typography>
                    <Typography variant="h5" sx={{display:passwordWrong,color:'red'}}>
                        Wrong Password!
                    </Typography>
                </Container>
                <Container disableGutters sx={{display:'flex',flexDirection:'column'}}>
                    <Typography variant="caption" sx={{fontWeight:'600',fontSize:'15px'}}>
                        Password
                    </Typography>
                    <TextField value={password} type="password" variant="outlined" size="small" sx={{width:'450px'}} placeholder="enter password" onChange={(evt)=>{setPassword(evt.target.value)}}/>
                </Container>
                <Container disableGutters sx={{display:'flex',justifyContent:'flex-end',columnGap:'10px'}}>
                    <Button onClick={()=>{
                        context.delete.setView('none');
                        context.setOverlayView('')
                        setPassword('')
                    }} sx={{color:'gray'}}>
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                        handleClick()
                    }} variant="contained" sx={{
                        backgroundColor:'#ff0000',
                        width:'min-content',
                        height:'40px',
                        textAlign:'center',
                        fontSize:'15px',
                        color:'white',
                        borderRadius:'12px'
                    }}>
                        Delete
                    </Button>
                </Container>
            </Container>
        </>
    )
}
export default Delete;