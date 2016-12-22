import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";

import mainRoute from "./router/main";

let app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use("/", mainRoute)

app.listen(3000, err => {
    if (err) throw err;
    console.log('Server run port 3000.');
});