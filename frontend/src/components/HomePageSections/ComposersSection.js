import React from 'react';
import styles from './HomePageSections.module.css';

function ComposersSection(props) {
    return (
        <section className={styles.homePageSection}>
            <h3 className={styles.homeSectionHeading}>Music Sheets From the Greats</h3>
            <div id={styles['composers']}>
                {props.composerImages.map((imageName, idx) => (
                    <img 
                        key={idx}
                        src={`/images/composers/${imageName}`}
                        alt={imageName}
                    />
                ))}
            </div>
        </section>
    );
};

export default ComposersSection;