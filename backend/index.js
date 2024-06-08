const express = require("express");
const app = express();
const rootRouter = require('./routes/index');
const bodyParser=require('body-parser');
const cors=require('cors')
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(cors(
    {
        origin: 'https://paytm-basic-v1.vercel.app',
        methods:["POST","GET","PUT","DELETE"],
        credentials:true,
    }
));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/v1", rootRouter);



app.listen(port, () => {
    console.log('Backend Running...')
})
