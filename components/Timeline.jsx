import { classNames } from '../utils/classNames'

const styles = {
    app__timeline_wrapper: 'relative pb-8',
    app__timeline_verticalLine: 'absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200',
    app__timeline_container: 'relative flex space-x-3',
    app__timeline_iconContainer: 'flex h-8 w-8 items-center justify-center rounded-full',
    app__timeline_icon: 'h-5 w-5 text-white',
    app__timeline_phaseContainer: 'flex justify-between space-x-10 pt-1.5',
    app__timeline_phaseTitle: 'text-sm text-gray-300',
    app__timeline_phaseTime: 'whitespace-nowrap text-right text-sm text-gray-200',
}

const Timeline = ({ index, timeline, isLastTimeline }) => {
    return (
        <li className={styles.app__timeline_wrapper}>
            {!isLastTimeline && <span className={styles.app__timeline_verticalLine} />}
            <div className={styles.app__timeline_container}>
                <div>
                    <span className={classNames(timeline.iconBackground, styles.app__timeline_iconContainer)}>
                        <timeline.icon className={styles.app__timeline_icon} />
                    </span>
                </div>
                <div className={styles.app__timeline_phaseContainer}>
                    <p className={styles.app__timeline_phaseTitle}>Phase {index + 1}</p>
                    <p className={styles.app__timeline_phaseTime}>{new Date(timeline.startTime).toDateString()}</p>
                </div>
            </div>
        </li>
    )
}

export default Timeline