import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Carousel.module.css';
import LeftArrow from '../Left Arrow/LeftArrow';
import RightArrow from '../Right Arrow/RightArrow';
import Card from '../Card/Card';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Carousel({songsData}) {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={8}
        centeredSlides={false}
        spaceBetween={20}
        navigation={{
            prevEl: `.${styles.leftArrow}`,  
            nextEl: `.${styles.rightArrow}`,  
        }}
        modules={[Pagination, Navigation]}
        className={styles.mySwiper}
        >
        {songsData.length ? (
          songsData.map((item) => {
            const follows = item.follows ? item.follows : item.likes;
            const label = item.follows ? "Follows" : "Likes";
            return (
              <SwiperSlide key={item.id} className={styles.swiperSlide}>
                <Card
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  follows={follows}
                  image={item.image}
                  slug={item.slug}
                  songs={item.songs}
                  label={label}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <p>Loading...</p>
        )}


        <div className={styles.leftArrow}>
            <LeftArrow />
        </div>
        <div className={styles.rightArrow}>
            <RightArrow />
        </div>
      </Swiper>
    </>
  );
}
