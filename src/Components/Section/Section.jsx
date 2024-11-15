import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './Section.module.css';
import Card from '../Card/Card';
import Carousel from "../Carousel/Carousel";

function Section(){
    const [songTopAlbumsData, setSongTopAlbumsData] = useState([]);
    const [songNewAlbumsData, setSongNewAlbumsData] = useState([]);
    const [showTopAlbums, setShowTopAlbums] = useState(false);
    const [showNewAlbums, setShowNewAlbums] = useState(false);

    const fetchTopAlbumsData = async() => {
        try{
            const response = await axios.get(`https://qtify-backend-labs.crio.do/albums/top`);
            console.log(response.data);
            setSongTopAlbumsData(response.data);
        }
        catch(error){
            console.log(error);
        }
    };
    const fetchNewAlbumsData = async() => {
        try{
            const response = await axios.get(`https://qtify-backend-labs.crio.do/albums/new`);
            console.log(response.data);
            setSongNewAlbumsData(response.data);
        }
        catch(error){
            console.log(error);
        }
    };

    const toggleTopAlbumsDisplay = () => {
        setShowTopAlbums(!showTopAlbums);
    }
    const toggleNewAlbumsDisplay = () => {
        setShowNewAlbums(!showNewAlbums);
    }

    useEffect(() => {
        fetchTopAlbumsData();
        fetchNewAlbumsData();
    },[]);

    return(
        <div className={styles.container}>
            <div className={styles.topAlbums}>
                <div className={styles.section}>
                    <p>Top Albums</p>
                    <button className={styles.button} onClick={toggleTopAlbumsDisplay} >
                        {showTopAlbums ? "Collapse" : "Show All"}
                    </button>
                </div>
                <div className={styles.cards}>
                    {showTopAlbums ? (
                        songTopAlbumsData.map((item) => (
                            <Card 
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            follows={item.follows}
                            image={item.image}
                            slug={item.slug}
                            songs={item.songs}
                            />
                        ))
                    ) : (<Carousel songsData={songTopAlbumsData}/>)}
                </div>
            </div>
            <div className={styles.newAlbums}>
                <div className={styles.section}>
                    <p>New Albums</p>
                    <button className={styles.button} onClick={toggleNewAlbumsDisplay} >
                        {showNewAlbums ? "Collapse" : "Show All"}
                    </button>
                </div>
                <div className={styles.cards}>
                {showNewAlbums ? (
                        songNewAlbumsData.map((item) => (
                            <Card 
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            follows={item.follows}
                            image={item.image}
                            slug={item.slug}
                            songs={item.songs}
                            />
                        ))
                    ) : (<Carousel songsData={songNewAlbumsData}/>)}
                </div>
            </div>
        </div>
    );
}
export default Section;