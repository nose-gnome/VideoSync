const express = require('express');
const router = express.Router();

var tickInterval;

var playing = false;
var currTime = 0;
var title = "";

router.get('/state', function(req, res) {
  res.json({time: currTime, title: title, playing: playing});
});

router.post('/state', (req, res) => {
  if(req.body.start == 'true'){
    if(tickInterval == undefined) {
      tickInterval = setInterval(tick, 1000);
      playing = true;
    }
  } else if (req.body.reset == 'true'){
    clearInterval(tickInterval);
    tickInterval = undefined;
    currTime = 0;
    playing = false;
  } else if (req.body.title != undefined) {
    title = req.body.title;
  }

  res.json({time: currTime, title: title, playing: playing});
});

function tick() {
  currTime++;
}

module.exports = {
  router:router,
}
