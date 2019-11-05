'use strict';
const axios = require('axios');

exports.temp = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    (async () => {
      try {
        const data = [];
        let i = 0;
        for (i = 1; i < 7; i++) {
          const temp = await axios.get(
            `https://temperature-sensor-service.herokuapp.com/sensor/${i}`,
          );
          data.push(temp.data);
        }
        await res.send({
          status: {
            code: 200,
            message: 'Success',
          },
          data,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }
};
