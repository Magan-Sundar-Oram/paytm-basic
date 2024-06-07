const express = require("express");
const app = express();
const rootRouter = require('./routes/index');
const bodyParser=require('body-parser');
const cors=require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/v1", rootRouter);



app.listen(3000, () => {
    console.log('Backend Running...')
})