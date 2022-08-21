
import { AiFillCloseCircle, AiTwotoneHome } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaBookReader } from 'react-icons/fa';
import { MdContacts } from 'react-icons/md';
import { BsMenuApp, BsMenuButtonWideFill } from 'react-icons/bs';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = ({ sites, status, setStatus, setFilter, today, setToday, filter, title, theme, setTheme, themes }) => {

    const location = useLocation();

    const initialFilter = { All: true, CodeForces: false, TopCoder: false, AtCoder: false, "CS Academy": false, CodeChef: false, HackerRank: false, HackerEarth: false, "Kick Start": false, LeetCode: false };
    const [filteredSites, setFilteredSites] = useState(initialFilter);


    const initializefilter = () => {
        let temp = filteredSites;
        if (filter.includes('all')) {
            temp.All = true;
        }
        else {
            temp.All = false;
            for (let item of filter) {
                temp[title(item)] = true;
            }
        }
        setFilteredSites(temp);
    }


    const ref = useRef()
    const toggleSidebar = () => {
        if (ref.current.classList.contains('-translate-x-full')) {
            ref.current.classList.remove('-translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('-translate-x-full')
        }
    }


    const onChange = (e) => {
        if (e.target.name !== 'All') {
            let fs = { ...filteredSites, [e.target.name]: e.target.checked };
            fs.All = false;
            setFilteredSites(fs)
        }
        else {
            setFilteredSites(initialFilter);
        }
    }

    const changeFilter = () => {
        let temp = [];
        let keys = Object.keys(filteredSites);
        for (let i = 0; i < keys.length; i++) {
            if (filteredSites[keys[i]] === true) {
                if (keys[i] === 'All') {
                    temp.push('all');
                }
                else {
                    temp.push(sites[keys[i]].title);
                }
            }
        }
        setFilter(temp);
        toggleSidebar();
    }

    const saveTheme = (mode) => {
        setTheme(mode)
        localStorage.setItem('mode', JSON.stringify(mode));
    }

    const handleChange = (e) => {
        if (e.target.name === "today") {
            setToday(e.target.checked)
            setStatus(false)
        }
        else if (e.target.name === "status") {
            setToday(false)
            setStatus(e.target.checked)
        }
    }




    useEffect(() => {
        initializefilter();
        toggleSidebar();
        // eslint-disable-next-line
    }, [location])



    return (
        <div className={`max-w-[1800px] flex flex-col md:space-y-0 space-y-4 md:flex-row justify-start m-auto items-center px-11 py-4 shadow-md sticky top-0 z-10 ${theme.bg} ${theme.text}`}>
            <div className="logo flex text-center md:mr-11">
                <span onClick={toggleSidebar} className="cursor-pointer text-2xl text-slate-600"><GiHamburgerMenu className={`${theme.bg} ${theme.text}`} /></span>
            </div>
            <div className="nav flex flex-col md:flex-row md:justify-between items-center w-full">
                <ul className='flex space-x-2 md:space-x-5 text-lg items-center font-bold my-2'>
                    <li onClick={() => { saveTheme(themes.light) }} className='w-14 cursor-pointer rounded-md h-6 bg-white border-2 border-gray-500'></li>
                    <li onClick={() => { saveTheme(themes.dark) }} className='w-14 cursor-pointer rounded-md h-6 bg-black border-2 border-gray-500'></li>
                    <li onClick={() => { saveTheme(themes.red) }} className='w-14 cursor-pointer rounded-md h-6 bg-red-700 border-2 border-gray-500'></li>
                    <li onClick={() => { saveTheme(themes.blue) }} className='w-14 cursor-pointer rounded-md h-6 bg-blue-700 border-2 border-gray-500'></li>

                </ul>

                <div className="logo flex items-center " >
                    <Link to='/'><img className='rounded-full w-12 h-12 border-2 border-white' src='/logo.png' alt="logo" /></Link>
                </div>
                {/* </a></Link> */}

                <div ref={ref} className={`sideCart z-10 overflow-y-auto fixed  h-full top-0 left-0  ${theme.bg === "bg-white" ? "bg-gray-200" : theme.bg} lg:w-[40%] max-w-[1300px] md:w-[50%] w-[65%] xl:w-[30%] py-11 px-8 transition-transform transform -translate-x-full`} >
                    <span onClick={toggleSidebar} className="absolute top-2 right-2 cursor-pointer text-3xl text-slate-600"><AiFillCloseCircle className={`${theme.text}`} /></span>
                    <div className={`flex mb-3 flex-col justify-between h-fit bg-gray-50 rounded-md border-r`}>
                        <div className="px-4 py-6">
                            <Link to={'/'}>
                                <span className={`block py-2 text-xl font-bold text-center ${theme.text} ${theme.bg === "bg-white" ? "bg-gray-400" : theme.bg} rounded-lg`}>&lt; CodeDcode /&gt;</span>
                            </Link>

                            <nav className={`flex flex-col mt-6 space-y-1 `}>
                                {/* <div className="flex justify-end">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="flexSwitchCheckChecked">Today</label>
                                    </div>
                                </div> */}
                                <Link
                                    to={'/'}
                                    className="flex items-center px-4 py-2 text-gray-500  rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                    <AiTwotoneHome />
                                    <span className="ml-3 text-lg font-medium"> Home </span>
                                </Link>
                                <Link
                                    to={'/about'}
                                    className="flex items-center px-4 py-2 text-gray-500  rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                    <FaBookReader />
                                    <span className="ml-3 text-lg font-medium"> About </span>
                                </Link>
                                <Link
                                    to={'/ide'}
                                    className="flex items-center px-4 py-2 text-gray-500  rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                    <BsMenuButtonWideFill />
                                    <span className="ml-3 text-lg font-medium"> Online IDE </span>
                                </Link>
                                <Link
                                    to={'/contact'}
                                    className="flex items-center px-4 py-2 text-gray-500  rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                    <MdContacts />
                                    <span className="ml-3 text-lg font-medium"> Contact Us</span>
                                </Link>

                                {location.pathname === "/" && <details className="group">
                                    <summary
                                        className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <BsMenuApp />

                                        <span className="ml-3 text-lg font-medium"> Filter </span>

                                        <span
                                            className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <nav className="mt-1.5 ml-8 flex flex-col">
                                        <div className="form-check my-2">
                                            <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                                                All
                                            </label>
                                            <input name="All" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="flexCheckDefault" checked={filteredSites.All} onChange={onChange} />
                                        </div>
                                        {Object.keys(sites).map((site) => {
                                            return <div key={sites[site].title} className="form-check my-2">
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                                                    {site}
                                                </label>
                                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="flexCheckDefault" checked={filteredSites[site]} name={site} onChange={onChange} />
                                            </div>
                                        })}

                                        <button onClick={changeFilter}
                                            className=" px-4 py-2 bg-indigo-600 rounded-lg mb-8 mt-2 hover:bg-indigo-800 text-white">
                                            Done
                                        </button>


                                        <div className="flex items-center space-x-4 my-2 w-full justify-between">
                                            <h3 className="text-gray-800">Present Coding Contests</h3>
                                            <label htmlFor="status" className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input type="checkbox" id="status" className="sr-only" name="status" onChange={handleChange} checked={status} />
                                                    <div className="block bg-gray-400 w-14 h-7 rounded-full"></div>
                                                    <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="flex items-center space-x-4 my-2 w-full justify-between">
                                            <h3 className="text-gray-800">Contest in 24 Hours</h3>
                                            <label htmlFor="today" className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input type="checkbox" id="today" className="sr-only" name="today" onChange={handleChange} checked={today} />
                                                    <div className="block bg-gray-400 w-14 h-7 rounded-full"></div>
                                                    <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
                                                </div>
                                            </label>
                                        </div>

                                    </nav>
                                </details>}



                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar