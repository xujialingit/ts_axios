const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConcig = require("./webpack.config");

const app = express();
const compiler = webpack(webpackConcig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: "/__build__/",
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get("/simple/get", function(req, res) {
    res.json({
        msg: "router simple"
    })
})

router.get("/base/get", function(req, res) {
    res.json(req.query)
})

router.post("/base/post", (req, res) => {
    res.json(req.body)
})

app.use(router);


const port = process.env.PORT || 9999;
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})