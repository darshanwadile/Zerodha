require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

console.log('🚀 Starting Zerodha Backend Server...');

const { HoldingsModel } = require('./models/HoldingsModel.js');
const {HoldingsData} = require('./init/HoldingsData.js');
const {PositionsData} = require("./init/PositionsData.js");
const {PositionModel} = require('./models/PositionsModel.js');
const {WatchListData} = require('./init/WatchListData.js');
const {WatchlistModel} = require('./models/WatchlistModel.js');
const {OrdersModel} = require('./models/OrdersModel.js')

const bodyParser  = require('body-parser')
const cors = require('cors');
const {fundsModel} = require('./models/FundsModel.js');

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { authenticateUser } = require("./Middlewares/AuthMiddleware");

// Configure CORS to allow credentials from specific origins
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173', 
            'http://localhost:5174', 
            'http://localhost:3000',
            'https://zerodha-eta-six.vercel.app',
            'https://zerodhadashboard-mu.vercel.app'
        ];
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Add logging middleware to debug CORS
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
    next();
});

app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());


const port = process.env.PORT || 8080;

// Use MongoDB Atlas for production with fallback to local
const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB Atlas connected successfully');
    } catch (error) {
        console.log('❌ Atlas connection failed, falling back to local MongoDB');
        console.log('Atlas error:', error.message);
        try {
            await mongoose.connect("mongodb://127.0.0.1:27017/zerodha");
            console.log('✅ Local MongoDB connected successfully');
        } catch (localError) {
            console.log('❌ Both Atlas and local MongoDB failed:', localError.message);
        }
    }
};

connectDB();

// mongoose.connection.on('connected', () => {
//     console.log('✅ MongoDB connected successfully');
// });

mongoose.connection.on('error', (err) => {
    console.log('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});

// Test route to verify CORS
app.get("/test", (req, res) => {
    res.json({ message: "CORS is working!", origin: req.get('Origin') });
});

app.use("/", authRoute);

app.get("/addWatchList",async(req,res)=>{
    await WatchlistModel.deleteMany();
    WatchListData.forEach(async(stock)=>{
        let newData = new WatchlistModel(stock);
        let result = await newData.save();
        console.log(result);
    })
    res.send("Data Added Successfully");
})

app.get("/addPositions",async(req,res)=>{
    await PositionModel.deleteMany();
    PositionsData.forEach(async(stock)=>{
        let newData = new PositionModel(stock);
        let res = await newData.save();
        console.log(res);
    })
    res.send("Data Added Successfully");
})


app.get("/addHoldings", async (req, res) => {
    await HoldingsModel.deleteMany();
    HoldingsData.forEach(async (currItem) => {
        let newHolding = new HoldingsModel({
            name: currItem.name,
            qty: currItem.qty,
            avg: currItem.avg,
            price: currItem.price,
            net: currItem.net,
            day: currItem.day
        });
        console.log(newHolding);
        await newHolding.save();
    })
    res.send("Data Inserted successfully")
})


app.get("/addOrders",async(req,res)=>{
    let deleteResult = await OrdersModel.deleteMany();
    let placedOrders = [
        {
            orderType: "BUY",
            stockName: "INFY",
            AveragePrice: 20,
            qty: 10,
        },
        {
            orderType: "SELL",
            stockName: "INFY",
            AveragePrice: 20,
            qty: 10
        }
    ]

   let insertResult =  await OrdersModel.insertMany(placedOrders);
   console.log(insertResult);
    res.send("Working properly")
})

app.post("/addWatchList",async(req,res)=>{
    let data = req.body;
    for(let i = 0; i < data.length; i++){
        let watchListStock = new WatchlistModel({"stockName":data[i].stockSymbol})
        let result = await watchListStock.save();
        console.log(result);
    }
    res.send("Data Inserted Successfully");
})





// WORKING ROUTES - USER SPECIFIC
app.get("/allHoldings", authenticateUser, async(req,res)=>{
    let allHoldings = await HoldingsModel.find({ userId: req.userId });
    res.json(allHoldings);
})

app.get("/allPositions", authenticateUser, async(req,res)=>{
    let allPositions = await PositionModel.find({ userId: req.userId });
    res.json(allPositions);
})


app.get("/allOrders", authenticateUser, async(req,res)=>{
   let fetechResult = await OrdersModel.find({ userId: req.userId });
    res.send(fetechResult);
})

app.post("/placeBuyOrder", authenticateUser, async(req,res)=>{
    let data = new OrdersModel({
        ...req.body,
        userId: req.userId
    });
    let saveResult = await data.save();

    //Insert into Holdings
    let holdingsStock = await HoldingsModel.findOne({"name":req.body.stockName, "userId": req.userId});
    if(holdingsStock)
    {
        let deleteResult = await HoldingsModel.deleteOne({"name":req.body.stockName, "userId": req.userId});
        console.log
        let newData =  new HoldingsModel({
            userId: req.userId,
            name:holdingsStock.name,
            price:req.body.AveragePrice,
            qty: Number(Number(holdingsStock.qty) + Number(req.body.qty)),
            avg: req.body.AveragePrice,
            net:"+0.58%",
            day:"+0.11%"
        });
        await newData.save();
    }
    else
    {
        let newData =  new HoldingsModel({
            userId: req.userId,
            name:req.body.stockName,
            price:req.body.AveragePrice,
            qty: req.body.qty, // Ensure this.qty and req.body.qty are numbers
            avg: req.body.AveragePrice,
            net:"+0.58%",
            day:"+0.11%"
        });
        await newData.save();
    }

    //Update Funds
    let currFunds = await fundsModel.findOne({ userId: req.userId });
    if (!currFunds) {
        // Create initial funds for new user
        currFunds = new fundsModel({ userId: req.userId, fundsAvilable: 100000 });
        await currFunds.save();
    }
    let currentAmount = Number(currFunds.fundsAvilable);
    let newFunds = Math.floor(currentAmount - (req.body.qty * req.body.AveragePrice));
    let deleteFunds = await fundsModel.deleteOne({ userId: req.userId });
    let addNewFunds = new fundsModel({"userId": req.userId, "fundsAvilable":newFunds});
    await addNewFunds.save();
    res.send(saveResult);
})

app.get("/getFunds", authenticateUser, async(req,res)=>{
    let currentFunds = await fundsModel.findOne({ userId: req.userId });
    res.send(currentFunds);
})

app.post("/addFunds", authenticateUser, async(req,res)=>{
    let fundsToadd = req.body.funds;
    fundsToadd = Number(fundsToadd)
    let currentFunds = await fundsModel.findOne({ userId: req.userId });
    if(currentFunds){   
        let currentAmount = Number(currentFunds.fundsAvilable);
        currentAmount += fundsToadd;
        let deleteResult = await fundsModel.deleteOne({ userId: req.userId });
        let insertData = new fundsModel({userId: req.userId, fundsAvilable: currentAmount});
        await insertData.save();
    }else{
        let insertData = new fundsModel({userId: req.userId, fundsAvilable:fundsToadd});
        let insertResult = await insertData.save();
    }
    res.send("Successfully Added Funds");
})


app.get("/getWatchlist", authenticateUser, async(req,res)=>{
    let result = await WatchlistModel.find({ userId: req.userId });
    res.send(result);
})

app.post("/updateHoldings", authenticateUser, async(req,res)=>{
    let data = req.body;
    let stockDocument = await HoldingsModel.findOneAndUpdate(
        {"name":data.name, "userId": req.userId},
        {$set:{"price":data.price,"net":data.net}}
    );
    res.send("Holdings Updated Successfully");
})


app.post("/addNewWatchListStock", authenticateUser, async(req,res)=>{
     let newStockSymbol = {
         ...req.body,
         userId: req.userId
     };
     console.log(newStockSymbol);
     let newWacthListStock = new WatchlistModel(newStockSymbol);
     let result = await newWacthListStock.save();
     res.send(result);
})

app.post("/deleteStock", authenticateUser, async(req,res)=>{
    let deleteStock = {
        ...req.body,
        userId: req.userId
    };
    let deleteResult = await WatchlistModel.findOneAndDelete(deleteStock);
    console.log(deleteResult);
    res.send(deleteResult);
})

app.post("/getAvilableQty", authenticateUser, async(req,res)=>{
    let stockName = req.body;
    let data = await HoldingsModel.findOne({"name":req.body.name, "userId": req.userId});
    res.send(data);
})

app.post("/placeSellOrder", authenticateUser, async(req,res)=>{
    let data = new OrdersModel({
        ...req.body,
        userId: req.userId
    });
    let saveResult = await data.save();

    //Insert into Holdings
    let holdingsStock = await HoldingsModel.findOne({"name":req.body.stockName, "userId": req.userId});
    if(holdingsStock)
    {
        let deleteResult = await HoldingsModel.deleteOne({"name":req.body.stockName, "userId": req.userId});
        console.log
        let newData =  new HoldingsModel({
            userId: req.userId,
            name:holdingsStock.name,
            price:req.body.AveragePrice,
            qty: Number(Number(holdingsStock.qty) - Number(req.body.qty)),
            avg: req.body.AveragePrice,
            net:"+0.58%",
            day:"+0.11%"
        });
        await newData.save();
    }

    //Update Funds
    let currFunds = await fundsModel.find({});
    currFunds = Number(currFunds[0].fundsAvilable);
    let newFunds = Math.floor(currFunds + (req.body.qty * req.body.AveragePrice));
    let deleteFunds = await fundsModel.deleteMany({});
    let addNewFunds = new fundsModel({"fundsAvilable":newFunds});
    await addNewFunds.save();
    res.send(saveResult);
})

app.listen(port, () => {
    console.log(`🌐 App Started on Server = ${port}`);
})