import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './Section.module.css';
import Card from '../Card/Card';

function Section(){
    const [songData, setSongData] = useState([]);
    const [showTopAlbums, setShowTopAlbums] = useState(false);
    const [showNewAlbums, setShowNewAlbums] = useState(false);

    const fetchData = async() => {
        try{
            const response = await axios.get(`https://qtify-backend-labs.crio.do/albums/top`);
            console.log(response.data);
            setSongData(response.data);
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
        fetchData();
    },[]);

    const displayTopAlbumData = showTopAlbums ? songData : songData.slice(0, 8);
    const displayNewAlbumData = showNewAlbums ? songData : songData.slice(0, 8);

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
                    {displayTopAlbumData.length ? (
                        displayTopAlbumData.map((item) => (
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
                    ) : (<p>Loading...</p>)}
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
                    {displayNewAlbumData.length ? (
                        displayNewAlbumData.map((item) => (
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
                    ) : (<p>Loading...</p>)}
                </div>
            </div>
        </div>
    );
}
export default Section;