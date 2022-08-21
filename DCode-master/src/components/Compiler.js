import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Loader from "./Loader";
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineCopy } from 'react-icons/ai';

const Compiler = ({ themes }) => {

    useEffect(() => {
        if (localStorage.getItem('theme') === "vs-dark" || localStorage.getItem('theme') === "light") {
            setCurTheme(localStorage.getItem('theme'));
        }
        let fontSz = parseInt(localStorage.getItem('fontsize'))
        if (fontSz && fontSz > 13 && fontSz < 31) {
            setFontSize(fontSz);
        }
        if (localStorage.getItem('code') && localStorage.getItem('code').length > 0) {
            setCode(localStorage.getItem('code'));
        }

        if (isEditorReady) {
            console.log("All Set!");
        }
        // eslint-disable-next-line
    }, [])


    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [curTheme, setCurTheme] = useState('vs-dark');
    const [fontSize, setFontSize] = useState(20);
    const [curLang, setCurLang] = useState("python");
    const [code, setCode] = useState("#Write your code here");

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    const languages = [
        { value: "python", label: "Python", default: "#Write your code here" },
        { value: "c", label: "C", default: "//Write your code here" },
        { value: "cpp", label: "C++", default: "//Write your code here" },
        { value: "java", label: "Java", default: "//Write your code here" }
    ];
    const mode = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]


    const compileCode = async () => {
        setLoading(true);
        setOutput("")
        // Post request to compile endpoint
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/compile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                language: curLang,
                input: input
            })
        });

        const response = await res.json();
        setLoading(false);
        setOutput(response.output)
    }


    const handleChange = (e) => {
        if (e.target.name === "input") {
            setInput(e.target.value)
        }
        if (e.target.name === "language") {
            setCurLang(e.target.value)
        }
        if (e.target.name === "theme") {
            setCurTheme(e.target.value)
            localStorage.setItem('theme', e.target.value)
        }
        if (e.target.name === "fontsize") {
            setFontSize(e.target.value)
            localStorage.setItem('fontsize', e.target.value)
        }
    }

    const [copybtn, setCopybtn] = useState("Copy");
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopybtn("Copied");
        setTimeout(() => {
            setCopybtn("Copy");
        }, 1000);
    }




    return (
        <section className={`py-12 ${themes.bg2} max-w-[1800px] mx-auto`}>
            <div className="flex flex-wrap w-full flex-col items-center text-center">
                <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${themes.text}`}>Code, Compile & Run</h1>
                <p className={`lg:w-1/2 w-full leading-relaxed ${themes.text2}`}>Compile & run your code with the DCode online IDE. Our online compiler supports multiple programming languages like Python, C++, C, Java and many more.
                </p>
            </div>
            <div className="min-h-screen flex flex-col md:flex-row md:space-x-1 mx-4 ">
                <div className="editor h-[90vh] md:w-2/3 my-7">
                    <div className="">
                        <div className="w-full flex flex-col md:space-x-2 md:flex-row">
                            <div className="relative md:w-1/3 md:my-0 my-1">
                                <select value={curLang} name="language" onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    {languages.map((language) => {
                                        return <option key={language.value} value={language.value}>{language.label}</option>
                                    })}

                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            <div className="relative md:w-1/3 md:my-0 my-1">
                                <select value={curTheme} name="theme" onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    {mode.map((theme) => {
                                        return <option key={theme.value} value={theme.value}>{theme.label}</option>
                                    })}

                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>

                            <div className="relative md:my-0 my-1 justify-between mr-0.5 md:w-1/3 pr-2 space-x-2 lg:space-x-0 flex appearance-none bg-gray-200 border text-gray-700 border-gray-200 py-3 px-4 rounded leading-tight focus:outline-none focus:border-gray-500">
                                <span className="md:hidden lg:block">Font Size</span>
                                <input className="min-w-[60%]" type="range" min="14" max="30" name="fontsize"
                                    value={fontSize} step="2"
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className={curTheme === "light" ? `border-4 border-gray-600` : ""} style={{ fontSize: "3rem" }}>
                        <Editor
                            height="90vh" // By default, it fully fits with its parent
                            theme={curTheme}
                            options={{ fontSize }}
                            language={curLang}
                            loading={<Loader type={"ide"} />}
                            value={code}
                            onChange={(value) => {
                                setCode(value);
                                localStorage.setItem('code', value)
                            }}
                            editorDidMount={handleEditorDidMount}
                        />
                    </div>
                </div>
                <div className={`right-container px-1 md:h-[90vh] md:w-1/3 ${curTheme === "vs-dark" ? "text-white" : "text-black"} my-7 h-[50vh]`}>
                    <div className=" md:my-0 my-40 h-full">
                        <div className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight ">
                            <div className="flex justify-between">
                                <input id="grid-city" type="text" value="Input" disabled />
                                <button type="button" className="flex text-white bg-indigo-500 border-0 py-1.5 px-3 -my-1.5 focus:outline-none items-center hover:bg-indigo-600 rounded text-xs -ml-11 lg:ml-0" onClick={() => { copyToClipboard(input) }}>
                                    <AiOutlineCopy className="cursor-pointer " /> {copybtn}
                                </button>
                            </div>
                        </div>
                        <div className={`input-box h-full ${curTheme === "vs-dark" ? "bg-black" : "bg-white"}`}>
                            <textarea className={`overflow-y-auto py-2 px-4 w-full code-inp ${curTheme === "vs-dark" ? "bg-gray-900 text-white  h-full" : "bg-white text-black border-4 h-[102.2%] border-gray-700"}`} onChange={handleChange} name="input" id="input" value={input}>
                            </textarea>
                        </div>
                    </div>
                </div>

            </div>
            <button type="button" className="flex mx-auto md:mt-16 md:my-0 mt-56 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none items-center space-x-2 hover:bg-indigo-600 rounded text-lg" onClick={compileCode}>
                {!loading && <BsFillPlayFill />}
                {loading && <div className="w-4 h-4"><Loader type="run" /></div>}
                {loading ? "Processing..." : "Run"}
            </button>
            <div className="h-[60vh] my-12 mx-5 pb-12 bg-red-400">
                <div className="appearance-none justify-between w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight flex">
                    <input  id="grid-city" type="text" value="Output" readOnly disabled />
                    <button type="button" className="flex -ml-11 sm:ml-0 text-white bg-indigo-500 border-0 py-1.5 px-3 -my-1.5 focus:outline-none items-center hover:bg-indigo-600 rounded text-xs" onClick={() => { copyToClipboard(output) }}>
                        <AiOutlineCopy className="cursor-pointer " /> {copybtn}
                    </button>
                </div>
                <div className={`output h-full  overflow-auto ${curTheme === "vs-dark" ? "bg-gray-900 text-white border-2 border-white" : "bg-white text-black border-gray-700 border-4"}`}>
                    {loading && <div className="h-full spinner-box flex items-center justify-center">
                        <Loader type="output" />
                    </div>}
                    {!loading && <div className=" output-box py-2 pb-5 px-5 overflow-visible">
                        <pre className="overflow-visible">{output}</pre>

                    </div>}
                </div>
            </div>
        </section>
    );
}

export default Compiler