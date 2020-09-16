const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('file-system');
const port = 3000;
const ansFilePath = './data/memoryNum.json';
let ans =  JSON.parse(fs.readFileSync(ansFilePath));

app.use(cors());

app.get('/getNum', (req, res) => {
    if (isNaN(parseInt(ans["number"]))){
        res.status(405);
    }
    res.send(ans["number"]);
})

app.put('/updateNum/:num', (req, res) => {
    if (isNaN(parseInt(req.params.num))){
        res.status(405).send("no number");
    } else {
        ans["number"] = req.params.num;
        fs.writeFileSync(ansFilePath, JSON.stringify(ans, null, 2));
        res.status(200).send("ok");
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})