const express = require("express");
const app = express();
const rootRouter = require('./routes/index');
const bodyParser=require('body-parser');
const cors=require('cors')

app.use(cors(
    {
        origin:["https://paytm-basic-backend-brown.vercel.app"],
        methods:["POST","GET","PUT"],
        credentials:true,
    }
));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/v1", rootRouter);



app.listen(3000, () => {
    console.log('Backend Running...')
})
