const express = require("express");
// const parseurl = require("parseurl"); // not required {req.url works same}
const session = require("express-session");

const app = express();

app.use(express.json());

const sessionObject = {
    secret: "secret",
    resave: true,
    saveUninitialized: true,
};

app.use(session(sessionObject));

// function will count number of times you visited endpoints present
// i.e '/', '/foo', '/bar', '/foo/bar'
function countUrlVisit(req, res, next) {
    let pathname = req.url;

    if (!req.session.views) {
        req.session.views = {};
    } 

    if (!req.session.views[pathname]) 
        req.session.views[pathname] = 1;
    else
        req.session.views[pathname] = req.session.views[pathname] + 1;
    
    // alternative for above if...else block
    
    // req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

    next();
}

app.use(countUrlVisit);

app.get("/", (req, res) => {
    const send = {
        sessionId: req.sessionID,
        sessionStore: req.sessionStore,
        session: req.session,
    };
    // console.log(req.url);
    console.log(req.originalUrl);

    res.json(req.session.views);
});

app.get("/foo", function (req, res, next) {
    const send = {
        sessionId: req.sessionID,
        sessionStore: req.sessionStore,
        session: req.session,
    };
    console.log(req.originalUrl);
    res.json(req.session.views);
});

app.get("/bar", function (req, res, next) {
    const send = {
        sessionId: req.sessionID,
        sessionStore: req.sessionStore,
        session: req.session,
    };
    console.log(req.originalUrl);
    res.json(req.session.views);
});

app.get("/foo/bar", function (req, res, next) {
    const send = {
        sessionId: req.sessionID,
        sessionStore: req.sessionStore,
        session: req.session,
    };
    console.log(req.originalUrl);
    res.json(req.session.views);
});

app.listen(3000, () => {
    console.log("server is up at 3000");
});
