
import Compiler from './components/Compiler';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Contests from './components/Contests';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar'
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import "./App.css";



function App() {

  const themes = {
    light: {
      text: 'red' ,
      text1: 'text-red-800',
      text2: 'text-gray-600',
      bg: 'bg-green',
      bg1: 'bg-gray-100',
      bg2: 'bg-gray-50'
    },
    dark: {
      text: 'text-white',
      text1: 'text-gray-200',
      text2: 'text-gray-300',
      bg: 'bg-black',
      bg1: 'bg-gray-800',
      bg2: 'bg-gray-500'
    },
    red: {
      text: 'text-white',
      text1: 'text-gray-200',
      text2: 'text-gray-300',
      bg: 'bg-red-800',
      bg1: 'bg-red-500',
      bg2: 'bg-red-300'
    },
    blue: {
      text: 'text-white',
      text1: 'text-gray-200',
      text2: 'text-gray-300',
      bg: 'bg-blue-800',
      bg1: 'bg-blue-500',
      bg2: 'bg-blue-300'
    }
  }

  const [theme, setTheme] = useState(themes.light);

  const sites =
  {
    CodeForces: {
      title: "codeforces",
      link: "https://codeforces.com",
      logo: "https://camo.githubusercontent.com/c9f24844008fd9d850b3277ed41192e361c202d36a9cd58b9dceefb4041e801b/68747470733a2f2f692e70696e696d672e636f6d2f373336782f62342f36652f35342f62343665353436613365653464343130663936316538316434613863616530662e6a7067"
    },
    TopCoder: {
      title: "top_coder",
      link: "https://topcoder.com",
      logo: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/tdenoarg7lu2emnoyu7c"
    },
    AtCoder: {
      title: "at_coder",
      link: "https://atcoder.jp",
      logo: "https://img.atcoder.jp/assets/atcoder.png"
    },
    "CS Academy": {
      title: "cs_academy",
      link: "https://csacademy.com",
      logo: "https://play-lh.googleusercontent.com/mNLWhhjA3m3fNMxW8cK9l-PgCkUkvghvnYvdob5Eze4gOeod7FdH38huer7ulzTeWV8x"
    },
    CodeChef: {
      title: "code_chef",
      link: "https://codechef.com",
      logo: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/zruiknbedz8yqafxbazb"
    },
    HackerRank: {
      title: "hacker_rank",
      link: "https://hackerrank.com",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnYQVhmoQeJpEKL44ENd1MJr-oSwniVaZ-wipsqlTbbnZgDRK7BvddB46yBIc5HzxJgR0&usqp=CAU"
    },
    HackerEarth: {
      title: "hacker_earth",
      link: "https://hackerearth.com",
      logo: "https://i1.sndcdn.com/avatars-000187997749-n2xz2w-t500x500.jpg"
    },
    "Kick Start": {
      title: "kick_start",
      link: "https://codingcompetitions.withgoogle.com/kickstart",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPjR1xmBrHy2mQloDfby35NwumgUBBHmdlaUooQo1twM2d5FOGmHcgDa9lmtV31Xx8mU&usqp=CAU"
    },
    LeetCode: {
      title: "leet_code",
      link: "https://leetcode.com",
      logo: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/83facdeba5b924cb3b1a"
    }
  }

  const [filter, setFilter] = useState(["all"]);
  const [contests, setContests] = useState([]);

  
  const [today, setToday] = useState(false);
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getData();
    if (localStorage.getItem('mode')) {
      setTheme(JSON.parse(localStorage.getItem('mode')))
    }

    // eslint-disable-next-line 
  }, [filter,today,status])



  const title = (filt) => {
    let keys = Object.keys(sites);
    for (let title of keys) {
      if (sites[title].title === filt) {
        return title
      }
    }
    return "All"
  }

  const sorting = (a, b) => {
    return a.start_time.localeCompare(b.start_time)
  }


  const applyTimeFilter = (arr,property, val)=>{
    let result = []
    for (let item of arr){
      if (item[property]===val){
        result.push(item);
      }
    }
    return result;
  }

  const getData = async () => {
    let filteredConst = [];
    setProgress(30);
    for (let item of filter) {
      const res = await fetch(`${process.env.REACT_APP_API_KEY}/${item}`);
      let response = await res.json();
      if (item === "all") {
        setProgress(80);
        response.sort(sorting);
        if (today){
          response = applyTimeFilter(response,"in_24_hours","Yes")
        }
        if (status){
          response = applyTimeFilter(response,"status","CODING")
        }
        setContests(response);
        setProgress(100);
        return;
      }
      for (let i of response) {
        if (!i.site) {
          i.site = title(item);
        }
        filteredConst.push(i);
      }
    }
    setProgress(80);
    filteredConst.sort(sorting);
    if (today){
      filteredConst = applyTimeFilter(filteredConst,"in_24_hours","Yes")
    }
    if (status){
      filteredConst = applyTimeFilter(filteredConst,"status","CODING")
    }
    setContests(filteredConst)
    setProgress(100);
  }


  return (
    <Router>

      <Navbar sites={sites} theme={theme} themes={themes} setTheme={setTheme} setFilter={setFilter} filter={filter} today={today} setToday={setToday} title={title} status={status} setStatus={setStatus} />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow={true}
        height={4}
      />

      <Routes>
        <Route exact path="/" index element={<Contests contests={contests} theme={theme} sites={sites} title={title} filter={filter} setContests={setContests} setProgress={setProgress} progress={progress} />} />

        <Route exact path="about" element={<About sites={sites} theme={theme} setProgress={setProgress} progress={progress} />} />

        <Route exact path="ide" element={<Compiler themes={theme} setProgress={setProgress} progress={progress} />} />

        <Route exact path="contact" element={<Contact theme={theme} setProgress={setProgress} progress={progress} />} />

      </Routes>
      <Footer theme={theme} />
    </Router >
  );
}

export default App;
