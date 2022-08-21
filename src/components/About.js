import React from 'react'
import LoadingBar from 'react-top-loading-bar'


const About = ({ sites, theme, setProgress, progress }) => {
    
    return (
        <section className={`${theme.text1} ${theme.bg1} body-font max-w-[1800px] mx-auto`}>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                shadow={true}
                height={4}
            />
            <div className="container px-5 pt-12 mx-auto">
                <div className="flex flex-col text-center w-full mb-8">
                    <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-4 ${theme.text}`}>Supported Sites</h1>
                    <p className={`${theme.text2} lg:w-2/3 mx-auto leading-relaxed text-base`}>One place to know your all upcoming contests of best coding platforms</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(sites).map((site) => {
                        return <div key={site} className=" p-4 rounded-md">
                            <div className="flex relative rounded-md">
                                <img alt="gallery" className="absolute rounded-md inset-0 w-full h-full object-cover object-center" src={sites[site].logo} />
                                <div className={`px-8 py-10 relative ${theme.bg2} w-full border-4  ${theme.text1} opacity-0  hover:opacity-100 rounded-md`}>
                                    <h2 className={`${theme.text1} tracking-widest text-sm title-font font-medium text-green-400 mb-1`}>{sites[site].title}</h2>
                                    <h1 className={`${theme.text} title-font text-lg font-medium mb-3`}>{site}</h1>
                                    <a href={sites[site].link} className='hover:text-indigo-400 text-sm ' target="_blank" rel='noreferrer'>
                                        <p className='overflow-x-scroll'>{sites[site].link}</p></a>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}

export default About