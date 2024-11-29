import React, { useState, useEffect } from 'react';
import { composers } from '../assets/composers';
import ComposersSection from '../components/HomePageSections/ComposersSection';
import styles from './Home.module.css';

function Home() {
    const [composerImages, setComposerImages] = useState([]);

    useEffect(() => {
        setComposerImages(composers);
    }, []);

    return (
        <>
        <section id={styles['homePageTop']}>
            <h1 id={styles['appName']}>MuseMe</h1>
            <div id={styles['shopDiv']}><a href="/buy"><button id={styles['shopButton']}><h4>See Music Books</h4></button></a></div>
        </section>
        <ComposersSection composerImages={composerImages} />
        {/* <section className={styles.homePageSection}>
            <h3 className={styles.homeSectionHeading}>Music Sheets From the Greats</h3>
            <div id={styles['composers']}>
                {composerImages.map((imageName, idx) => (
                    <img 
                        key={idx}
                        src={`/images/composers/${imageName}`}
                        alt={imageName}
                    />
                ))}
            </div>
        </section> */}
        </>
    );
}

export default Home;