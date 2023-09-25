import { Button, Container, Typography } from "@mui/material";
import { useContext } from "react";
import Searchbar from "../components/searchbar";
import { Context } from "../pages/App";

function Header(){
    const context = useContext(Context)
    return(
        <>
            <Container disableGutters sx={{
                display:'flex',
                paddingLeft:'12px',
                paddingRight:'12px',
                paddingTop:'20px',
                paddingBottom:'0px',
                }}>
                <Container disableGutters sx={{display:'flex',paddingLeft:'0',paddingRight:'0'}}>
                    {/* <img alt="person-logo" src={PersonLogo} style={{height:'40px',width:'40px'}}></img> */}
                    <Container sx={{display:'flex',flexDirection:'column',width:'200px',margin:'0'}}>
                        <Typography variant="h5">
                            meme collector
                        </Typography>
                        {/* <Link href="https://devchallenges.io/">devchallenges.io</Link> */}
                    </Container>
                    <Searchbar/>
                </Container>
                <Button onClick={()=>{
                        context.upload.setView('flex');
                        context.setOverlayView('overlayed')
                    }}  variant="contained" sx={{
                    backgroundColor:'#00cc7a',
                    width:'170px',
                    height:'40px',
                    textAlign:'center',
                    fontSize:'15px',
                    color:'white',
                    borderRadius:'12px'
                }}>
                    Add a photo
                </Button>
            </Container>

        </>
    )
}
export default Header;