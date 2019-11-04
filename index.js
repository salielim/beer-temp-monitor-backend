'use strict';
const axios = require('axios');

exports.temp = (req, res) => {
  const { queueUrl } = req.body;

  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    (async () => {
      // await call api
      try {
        const temp = await axios.get(
          'https://temperature-sensor-service.herokuapp.com/sensor/1',
        );
        console.log('temp ', temp.data);
        await res.send({
          status: {
            code: 200,
            message: 'Success',
          },
          data: temp.data,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }
};
