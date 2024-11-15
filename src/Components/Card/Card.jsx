import React from "react";
import styles from './Card.module.css';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';

function CardComponet({ id, description,  follows, image, slug, songs,  title, label}){
    return(
        <div className={styles.component}>
            <Card id={id} className={styles.card}>
                <CardMedia
                component="img"
                image={image}
                alt={slug}
                className={styles.cardImage}
                />
                <CardContent className={styles.cardContent}>
                <Box
                sx={{
                    display: "flex",
                    alignItems: "center", 
                    height: "1vh", 
                }}
                >
                <Chip
                    label={`${follows} ${label}`}
                    sx={{
                    backgroundColor: "#121212",
                    color: "#FFFFFF",
                    }}
                />
                </Box>
                </CardContent>
            </Card>
            <div className={styles.titleDiv}>
                <Typography variant="p" className={styles.title}>
                    {title}
                </Typography>
            </div>
        </div>
    );
}
export default CardComponet;