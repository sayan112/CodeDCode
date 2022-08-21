import React from 'react'
import LoadingBar from 'react-top-loading-bar'

// import { Link } from 'react-router-dom';

const Contests = ({ contests, sites, title, filter, theme, setProgress, progress }) => {

    const getTime = (now) => {
        now = new Date(now);
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ];
        var month = months[now.getMonth()];
        var date = now.getDate();
        var year = now.getFullYear();

        let hours = now.getHours();
        let mins = now.getMinutes();

        let periods = "AM";

        if (hours > 11) {
            periods = "PM";
            if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }

        return `${month} ${date} ${year} | ${hours}:${mins} ${periods}`;
    };




    return (
        <>
            <section className={`${theme.text2} ${theme.bg1} body-font min-h-screen max-w-[1800px] mx-auto`}>
                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                    shadow={true}
                    height={4}
                />
                <div className="container px-5 py-12 mx-auto">
                    <h2 className={`${theme.text} text-center font-mono text-3xl font-bold`}>UPCOMING CONTESTS</h2>
                    <div className={`category space-x-2 pb-4 text-center ${theme.text2}`}>
                        ({filter.map((flt, idx) => {
                            return <span key={flt} className={`category space-x-2 pb-4 text-center ${theme.text2}`}>{title(flt)}{idx === filter.length - 1 ? "" : ", "}</span>
                        })})
                    </div>

                    {contests.length === 0 && <div className={` flex items-center justify-center my-3 h-[40vh] p-5 text-2xl ${theme.text} ${theme.bg2}`}>No Results to show...</div>}
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {contests.map((contest) => {
                            return <div key={contest.name} className="p-4 ">
                                <div className={`h-full shadow-md ${theme.bg2} bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative`}>
                                    <a className='text-center space-y-2 flex flex-col items-center' target="_blank" rel="noreferrer" href={sites[contest.site].link}>
                                        <img className='h-9 rounded-md w-9' src={sites[contest.site].logo} alt="" />
                                        <h3 className=" tracking-widest text-sm text-green-700 title-font font-medium mb-1" >{contest.site}</h3>
                                    </a>
                                    <a href={contest.url} target="_blank" rel="noreferrer" className={`title-font sm:text-2xl text-xl font-medium ${theme.text} mb-3 hover:text-indigo-400`}>{contest.name}</a>
                                    <div className={`leading-relaxed mb-3 ${theme.text2}`}>
                                        <p ><b>Start Time</b> : {getTime(contest.start_time)}</p>
                                        <p ><b>End Time</b> : {getTime(contest.end_time)}</p>
                                        <p ><b>Duration</b> : {contest.duration / 60} min</p>
                                    </div>
                                    <a target="_blank" rel="noreferrer" href={contest.url} className="text-green-400 hover:text-green-600 inline-flex items-center">View Contest
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </section>

        </>
    )
}

export default Contests