import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './Tabs.module.css';
import Carousel from '../Carousel/Carousel';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);

    let filteredData = [];
    switch(newValue){
        case 1:
            filteredData = songs.filter((song) => song.genre.label === 'Jazz');
            break;
        case 2:
            filteredData = songs.filter((song) => song.genre.label === 'Rock');
            break;
        case 3:
            filteredData = songs.filter((song) => song.genre.label === 'Pop');
            break;
        case 4:
            filteredData = songs.filter((song) => song.genre.label === 'Blues');
            break;
        default:
            filteredData = songs;
    }

    setFilteredSongs(filteredData);
  };

  const fetchGenre = async() => {
    try{
        const response = await axios.get(`https://qtify-backend-labs.crio.do/genres`);
        setGenres(response.data.data);

    }catch(error){
        console.error(error);
    }
  };

  const fetchSongs = async() => {
    try{
        const response = await axios.get(`https://qtify-backend-labs.crio.do/songs`);
        setSongs(response.data);
        setFilteredSongs(response.data);

    }catch(error){
        console.error(error);
    }
  };

  useEffect(() => {
    fetchGenre();
    fetchSongs();
  },[]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={styles.tabsContainer} >
        <Tabs value={value} 
        onChange={handleChange} 
        aria-label="basic tabs example" 
        classes={{ indicator: styles.indicator }}
        sx={{
            '& .Mui-selected': {
              color: '#FFF',
              backgroundColor: 'transparent', 
            },
            '& .MuiTab-root': {
                color: '#FFF', 
            },
            '& .MuiTabs-indicator': {
                backgroundColor: '#34C94B', 
            }
          }}
        >
          <Tab label="All"
           {...a11yProps(0)}
           className={styles.tab} 
           classes={{ selected: styles.selectedTab }}
           />

          {genres.map((genre, index) => (
            <Tab
            key={genre.key} 
            label={genre.label}
            {...a11yProps(index + 1)}
            className={styles.tab}
            classes={{ selected: styles.selectedTab }}
            />
          ))}

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} className={styles.tabPanel}>
        <Carousel songsData={songs}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} className={styles.tabPanel}>
        <Carousel songsData={filteredSongs}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} className={styles.tabPanel}>
        <Carousel songsData={filteredSongs}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} className={styles.tabPanel}>
        <Carousel songsData={filteredSongs}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4} className={styles.tabPanel}>
        <Carousel songsData={filteredSongs}/>
      </CustomTabPanel>
    </Box>
  );
}
