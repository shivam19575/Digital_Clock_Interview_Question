const express = require('express');
const router = express.Router();
const Clock = require('../models/Clock');

// Route to save data to the database
router.post('/save', async (req, res) => {
  const { time, description } = req.body;
  try {
    const clock = new Clock({ time, description });
    await clock.save();
    res.status(201).json({ message: 'Time and description saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Route to check if time is reached or over
// router.get('/check', async (req, res) => {
//   const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   try {
//     const records = await Clock.find();
//     const response = records.map(record => {
//       if (record.time <= currentTime && !record.isTriggered) {
//         record.isTriggered = true;
//         record.save();
//         return `Time reached for "${record.description}"`;
//       } else if (record.isTriggered) {
//         return `Time already over for "${record.description}"`;
//       }
//       return `Time not yet reached for "${record.description}"`;
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to check time status' });
//   }
// });
router.get('/check', async (req, res) => {
  const now = new Date();

  try {
    const records = await Clock.find();
    const response = records.map(record => {
      const [hours, minutes] = record.time.split(':').map(Number);
      const recordTime = new Date(now);
      recordTime.setHours(hours, minutes, 0, 0);

      const timeDifferenceMs = recordTime - now; // in milliseconds
      const timeDifferenceSec = Math.floor(timeDifferenceMs / 1000); // in seconds

      if (timeDifferenceMs <= 0) {
        if (!record.isTriggered) {
          record.isTriggered = true;
          record.save();
          return { description: record.description, status: 'Time reached' };
        } else {
          return { description: record.description, status: 'Time over' };
        }
      } else {
        const remainingMinutes = Math.floor(timeDifferenceSec / 60);
        const remainingSeconds = timeDifferenceSec % 60;
        return {
          description: record.description,
          status: 'Counting down',
          remainingTime: {
            minutes: remainingMinutes,
            seconds: remainingSeconds,
          },
        };
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check time status' });
  }
});

module.exports = router;
