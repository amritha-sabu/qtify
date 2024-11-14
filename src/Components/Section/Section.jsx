import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './Section.module.css';
import Card from '../Card/Card';

function Section(){
    const [songData, setSongData] = useState([]);
    const [show, setShow] = useState(false);

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

    const toggleDisplay = () => {
        setShow(!show);
    }

    useEffect(() => {
        fetchData();
    },[]);

    const displayData = show ? songData : songData.slice(0, 8);

    return(
        <div className={styles.container}>
            <div className={styles.section}>
                <p>Top Albums</p>
                <button className={styles.button} onClick={toggleDisplay} >
                    {show ? "Collapse" : "Show All"}
                </button>
            </div>
            <div className={styles.cards}>
                {displayData.length ? (
                    displayData.map((item) => (
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
    );
}
export default Section;