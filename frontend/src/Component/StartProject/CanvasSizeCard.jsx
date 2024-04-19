import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box, Button, CardActionArea, CardActions, CardMedia, Typography} from "@mui/material";
import { useSelector } from 'react-redux';
import store from "../MainCanvas/context/store";
import {set} from "../MainCanvas/context/canvasSizeReducer";
import {useNavigate} from "react-router-dom";


export default function CanvasSizeCard(props) {

    const navigate=useNavigate()


    function handleSetCanvasSize (width,height ) {
        store.dispatch(set({width, height}))
        navigate("/maincanvas")

    }

    return (
        <Card sx={{ maxWidth: 345 }} className={props.class} onClick={()=>handleSetCanvasSize(900,800)}>
            <CardActionArea>
                <div>
                    size
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}