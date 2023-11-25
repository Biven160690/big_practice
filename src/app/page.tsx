'use client';

import { AnimationElements } from './components/animation/AnimationElements';
import { ProgressBar } from './components/progressBar/ProgressBar';
import { TabPanel } from './components/tabs/example-1/TabPanel';
import { HorizonScroll } from './components/scroll/example/HorizonScroll';
import { DefaultCarousel } from './components/scroll/example/DefaultCarousel';
import { VerticalScroll } from './components/scroll/example/VerticalScroll';
import { InfiniteCarousel } from './components/scroll/example/InfiniteCarousel';

import styles from './page.module.scss';
import { ExpandingCards } from './components/50_projects/expandingCards';
import { ProgressBarSteps } from './components/50_projects/progressBarSteps';
import { RotatingBG } from './components/50_projects/rotatingBG';
import { HiddenSearch } from './components/50_projects/hiddenSearch';

export default function App() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.animatedContainer}>
                    <AnimationElements />
                </div>
                <div className={styles.progressBarContainer}>
                    <ProgressBar />
                </div>
                <div className={styles.tabsContainer}>
                    <TabPanel />
                </div>
                <div className={styles.horizonContainer}>
                    <HorizonScroll />
                </div>
                <div className={styles.verticalContainer}>
                    <VerticalScroll />
                </div>
                <div className={styles.carouselContainer}>
                    <InfiniteCarousel />
                </div>
                <div className={styles.horizonContainer}>
                    <DefaultCarousel />
                </div>
                <div className={styles.expandingCards}>
                    <ExpandingCards />
                </div>
                <div className={styles.progressBarSteps}>
                    <ProgressBarSteps />
                </div>
                <div className={styles.rotatingBG}>
                    <RotatingBG />
                </div>
                <div className={styles.hiddenSearch}>
                    <HiddenSearch />
                </div>
            </div>
        </div>
    );
}
