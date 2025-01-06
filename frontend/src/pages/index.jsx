import React, { useState, useEffect } from 'react';
import { composers } from '../assets/composers';
import ComposersSection from '../components/HomePageSections/ComposersSection';
import SeeBooksButton from '../components/buttons/SeeBooksButton/SeeBooksButton';
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
            <SeeBooksButton />
        </section>
        <ComposersSection composerImages={composerImages} />
        </>
    );
}

export default Home;