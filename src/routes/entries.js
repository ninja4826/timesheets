import { Router } from 'express';
import { Entry } from '../models';

export function makeRoutes() {
  let router = Router();
  
  router.put('/:day', (req, res) => {
    console.log('body:', req.body);
    
    // let day = new Date(req.params.day * 1000);
    let day = new Date(parseInt(req.params.day));
    console.log('day:', day);
    Entry.findOne({ day })
      .catch((err) => res.json({ success: false, err }))
      .then((entry) => {
        console.log('found entry:', entry);
        let props = ['in_time', 'out_time', 'lunch_start', 'lunch_end'];
        if (entry) {
          let entryObj = entry.toObject();
          let hasSet = false;
          let setObj = {};
          let hasDel = false;
          let delObj = {};
          for (let prop of props) {
            // if (req.body.hasOwnProperty(prop)) {
            //   setObj[prop] = req.body[prop];
            // }
            if (req.body.hasOwnProperty(prop)) {
              if (!entryObj.hasOwnProperty(prop) || entryObj[prop] !== req.body[prop]) {
                // setObj[prop] = new Date(req.body[prop] * 1000);
                setObj[prop] = new Date(req.body[prop]);
                hasSet = true;
              }
            } else if (entryObj.hasOwnProperty(prop)) {
              delObj[prop] = 1;
              hasDel = true;
            }
          }
          if (hasSet || hasDel) {
            let updateObj = {};
            if (hasSet) {
              updateObj['$set'] = setObj;
            }
            if (hasDel) {
              updateObj['$unset'] = delObj;
            }
            console.log('update obj:', updateObj);
            Entry.findOneAndUpdate({ _id: entry._id }, updateObj, { new: true })
              .catch((err) => res.json({ success: false, err }))
              .then((_entry) => {
                console.log('updated entry:', _entry);
                res.json({ success: true, entry: _entry.toObject() });
              });
          } else {
            res.json({ success: false, err: "No properties were given." });
          }
        } else {
          let hasProp = false;
          let newObj = { day };
          for (let prop of props) {
            if (req.body.hasOwnProperty(prop)) {
              // newObj[prop] = new Date(req.body[prop] * 1000);
              newObj[prop] = new Date(req.body[prop]);
              hasProp = true;
            }
          }
          console.log('new obj:', newObj);
          if (hasProp) {
            entry = new Entry(newObj);
            console.log('new entry:', entry);
            entry.save()
              .catch((err) => res.json({ success: false, err }))
              .then((_entry) => {
                console.log('saved new entry:', _entry);
                res.json({ success: true, entry: _entry });
              });
          } else {
            res.json({ success: false, err: "No properties were given." });
          }
        }
      });
  });
  
  router.get('/test', (req, res) => {
    console.log('blah');
    Entry.findOne({ _id: "577e9e9a559d8add03873c49"})
      .catch((err) => res.json({ err }))
      .then((entry) => {
        // console.log(entry.toObject());
        entry = entry.toObject();
        for (let prop of ['in_time', 'out_time', 'lunch_start', 'lunch_end']) {
          if (entry.hasOwnProperty(prop)) {
            console.log(`entry has ${prop}: ${entry[prop]}`);
          }
        }
      });
  })
  
  return router;
}