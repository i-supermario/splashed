import { Container, TextField } from "@mui/material";
import { useContext } from "react";
import Logo from "../assets/Searchicon.svg"
import { Context } from "../pages/App";




function Searchbar(){
    const context = useContext(Context)

    function handleKey(evt){
        if(evt.keyCode===13){
            context.fetchImages()
        }
    }

    return(
        <>
            <Container sx={{display:'flex',columnGap:'10px',borderRadius:'10px',width:'250px',border:'1px solid gray',height:'40px',margin:'0'}}>
                    <img alt="search-icon" src={Logo} style={{width:'20px',height:'20px',marginTop:'10px'}}/>
                    <TextField variant="standard" sx={{marginTop:'4px',"::placeholder":'black'}} InputProps={{ disableUnderline: true }} placeholder="Search by name" 
                    value={context.search.text} 
                    onChange={async (evt)=>{
                        await context.search.setText(evt.target.value)
                        }} 
                    onKeyDown={(evt)=>{handleKey(evt)}}
                        />
            </Container>
        </>
    )
}
export default Searchbar;