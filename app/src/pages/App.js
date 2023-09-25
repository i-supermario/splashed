import "../styles/App.css";
import MasonryLayout from '../layouts/masonry';
import { Container, createTheme, ThemeProvider } from "@mui/material";
import Header from "../layouts/header";
import Delete from "../layouts/delete";
import Uploader from "../layouts/uploader";
import Image from "../components/image";
import { createContext, useEffect, useState } from "react";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.overlayed':{
            width:'100%',
            height:'100%',
            margin:'0',
            top:'0',
            left:'0',
            right:'0',
            bottom:'0',
            background:'rgba(0,0,0,0.6)',
            zIndex:'2',
            overflowY:'clip',
            filter:'brightness(40%)',
            pointerEvents:'none',
            transition: 'all 0.5s',
          }
        },
      },
    },
  },
});

export const Context = createContext()

function App() {

  const [overlay,setOverlay] = useState('')
  const [uploadView,setUploadView] = useState('none')
  const [deleteView,setDeleteView] = useState('none')
  const [imageList,setImageList] = useState([])
  const [id,setId] = useState('')
  const [searchText,setSearchText] = useState('')

  async function fetchData(){
    await fetch("https://meme-collector-backend.onrender.com/app/getAll")
    .then(res=>res.json())
    .then(currdata=>{
        const images = []
        console.log("fetching data")
        console.log(searchText)
        Object.values(currdata
          .filter(o => o.label.toLowerCase().includes(searchText)))
          .forEach((image)=>{
            images.push(
                <Container disableGutters key={image._id} sx={{textAlign:'center',padding:'0'}}>
                    <Image src={image.url} label={image.label} id={image._id}/>
                </Container>
            )
        })
        images.reverse()
        setImageList(images)
    })
    .catch((error) => {
        console.error(error);
      });
  }

  useEffect(()=>{
    fetchData()
  },[])

  const context = {
    upload: {
      setView: setUploadView,
    },
    delete:{
      setView: setDeleteView,
      setDeleteId: setId,
    },
    setOverlayView: setOverlay,
    search:{
      setText: setSearchText,
      text: searchText
    },
    fetchImages:fetchData
    
  }

  
  return (
    <>
      <Context.Provider value={context}>
        <ThemeProvider theme={theme}>
          <Container className={overlay} maxWidth={false} disableGutters sx={{
            minHeight:'100vh',
            display:'flex',
            justifyContent:'start',
            alignContent:'center',
            flexDirection:'column',
            padding:'10px 200px 10px 200px',
            rowGap:'50px',
            fontFamily:'Rockwell',
            backgroundColor:"lightgray"
            }} >
            <Header/>
            <MasonryLayout images={imageList}/>
          </Container>
        </ThemeProvider>
        <Container disableGutters sx={{
          position:'absolute',
          top:'30%',
          left:'10%',
          display:'flex',
          justifyContent:'center',
          alignContent:'center',
          flexDirection:'column',
          padding:'10px 150px 10px 150px',
          rowGap:'50px',
          fontFamily:'Rockwell',
          zIndex:'5',
        }}>
          <Uploader view={uploadView}/>
          <Delete view={deleteView} deleteId={id}/>
        </Container>
      </Context.Provider>
      
    </>
  );
}

export default App;
