const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to mongoose');
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET,POST'],
    credentials:true
}))

const UserRouter=require('./Routes/UserRoutes')
app.use('/',UserRouter)
const AdminRouter=require('./Routes/AdminRoutes')
app.use('/admin',AdminRouter)

app.listen(4000, () => {
  console.log('server running at 4000');
});

