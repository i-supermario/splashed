import Masonry from "@mui/lab/Masonry"


function MasonryLayout(props){


    return(
        <>
            <Masonry columns={3} spacing={3}>
                {props.images}
            </Masonry>
        </>
    )

}
export default MasonryLayout;