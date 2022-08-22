const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;
const { generateFile } = require('./generateFile');
const { executeCpp } = require("./executeCpp");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.post("/compile", (req, res) => {
//     //getting the required data from the request
//     let code = req.body.code;
//     let language = req.body.language;
//     let input = req.body.input;

//     if (language === "c") {
//         language = "50"
//     }

//     let data = ({
//         "language_id": language,
//         "source_code": code,
//         "stdin": input
//     });

//     let config = {
//         method: 'POST',
//         url: 'https://judge0-ce.p.rapidapi.com/submissions',
//         params: { base64_encoded: 'true', fields: '*' },
//         headers: {
//             'content-type': 'application/json',
//             'Content-Type': 'application/json',
//             'X-RapidAPI-Key': '97a7ccb761msh5f8d43caa9f59c4p1a2681jsn531c088a9b00',
//             'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
//         },
//         data: data
//     };
//     //calling the code compilation API
//     Axios(config)
//         .then((response) => {
//             res.send(response.data)
//             console.log(response.data)
//         }).catch((error) => {
//             console.log(error);
//         });
// })

app.post('/compile', async(req, res) => {
    const { language = "cpp", code, userInput } = req.body;
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    const filepath = await generateFile(language, code);

    const output = await executeCpp(filepath);

    res.send(output);
    console.log(output);
    return res.json({ filepath, output });
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});