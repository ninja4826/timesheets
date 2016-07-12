import { Router } from 'express';
import { Month } from '../models';

export function makeRoutes() {
  let router = Router();
  
  router.get('/', (req, res) => {
    let qObj = {};
    // console.log('querystring:', req.query);
    if (req.query.q) {
      qObj = JSON.parse(req.query.q);
    }
    let query = Month.find(qObj);
    let limit;
    if (req.query.limit) {
      // query.limit(parseInt(req.query.limit));
      limit = parseInt(req.query.limit);
      query.limit(limit);
    }
    query.populate('entries').catch((err) => res.json({ success: false, err }))
      .then((months) => {
        if (months && months.length !== 0) {
          if (limit && limit === 1) {
            res.json({ success: true, month: months[0].toObject() });
          } else {
            res.json({ success: true, months: months.map((m) => m.toObject()) });
          }
        } else {
          res.json({ success: false });
        }
      });
  });
  
  return router;
}