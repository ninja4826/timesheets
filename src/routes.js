import { Router } from 'express';
import { Month, Entry } from './models';

export function makeRoutes() {
  let router = Router();
  
  router.get('/find/:month_num/:year_num', (req, res) => {
    Month.findOne({
      num: req.params.month_num,
      year: req.params.year_num
    }).populate('entries').catch((err) => res.json({ err }))
      .then((month) => {
        if (month && month.entries) {
          res.json(month.entries.map((entry) => entry.toObject()));
        } else {
          res.json({ success: false });
        }
      });
    
    // Entry.find().populate('month').catch((err) => res.json({ err }))
    //   .then((entries) => {
    //     res.json(entries);
    //   })
  });
  
  // router.post('/add', (req, res) => {
  //   console.log(req.body);
  //   console.log(req.get('Content-Type'));
  //   // res.json({});
  //   // return;
  //   let updateMap = {};
  //   if (req.body.updates) {
  //     for (let update of req.body.updates) {
  //       let day = new Date(update.day * 1000);
  //       console.log('day:', day);
  //       let updateObj = {};
  //       for (let field in update) {
  //         if (field !== 'day') {
  //           updateObj[field] = new Date(update[field] * 1000);
  //         }
  //       }
  //       // updateObj.day_num = day.getDate();
  //       updateMap[day] = {
  //         "$set": updateObj
  //       };
        
  //     }
  //   }
    
  //   if (req.body.deletions) {
  //     for (let deletion of req.body.deletions) {
  //       let day = new Date(deletion.day * 1000);
  //       console.log('day:', day);
  //       if (deletion.day in updateMap) {
  //         for (let field of deletion.fields) {
  //           if (field in updateMap[day]['$set']) {
  //             let updateObj = updateMap[day]['$set'];
  //             delete updateObj[field];
  //             updateMap[day]['$set'] = updateObj;
  //           }
  //         }
  //         updateMap[day]['$unset'] = deletion.fields.reduce((ret, field) => {
  //           ret[field] = 1;
  //           return ret;
  //         }, {});
  //       } else {
  //         updateMap[day] = {
  //           "$unset": deletion.fields.reduce((ret, field) => {
  //             ret[field] = 1;
  //             return ret;
  //           }, {})
  //         };
  //       }
  //     }
  //   }
    
  //   console.log('updateMap:', updateMap);
    
  //   let findProms = [];
  //   for (let day in updateMap) {
  //     if (updateMap.hasOwnProperty(day)) {
  //       let update = updateMap[day];
  //       console.log(update);
  //       // proms.push(Entry.findOneAndUpdate({ day }, update, { upsert: true, new: true }).catch((err) => {
  //       //   console.error(err);
  //       //   res.json({ err });
  //       // }));
        
  //       findProms.push(Entry.findOne({ day }).exec().catch((err) => {
  //         console.error(err);
  //         res.json({ err });
  //       }));
  //       // .then((entry) => {
  //       //   if (entry) {
  //       //     proms.push(entry.update(updateMap[entry.day]).catch((err) => {
  //       //       console.error(err);
  //       //       res.json({ err });
  //       //     }));
  //       //   }
  //       // });
  //     }
  //   }
  //   let upProms = [];
  //   Promise.all(findProms).then((entries) => {
  //     console.log('findProms:', entries);
  //     for (let day in updateMap) {
  //       if (updateMap.hasOwnProperty(day)) {
  //         let entry = entries.find((ent) => ent.day.getTime() === day.getTime());
  //         if (entry) {
  //           upProms.push(entry.update(updateMap[day]).catch((err) => {
  //             console.error(err);
  //             res.json({ err });
  //           }));
  //         } else if ('$set' in day) {
  //           entry = new Entry(day['$set']);
  //           upProms.push(entry.save().catch((err) => {
  //             console.error(err);
  //             res.json({ err });
  //           }));
  //         }
  //       }
  //     }
  //     Promise.all(upProms).then((data) => {
  //       console.log('upProms:', data);
  //       res.json({ success: true, data });
  //     });
  //   });
  // });
  
  // router.post('/add', (req, res) => {
  //   console.log('body:', req.body);
  //   console.log('content type:', req.get('Content-Type'));
    
  //   let updateProms = [];
    
  //   if (req.body.updates) {
  //     for (let update of req.body.updates) {
  //       let day = new Date(update.day * 1000);
  //       console.log('day:', day);
  //       let updateObj = {};
  //       for (let field in update) {
  //         // if (field !== 'day') {
  //           // updateProms.push(Entry.findOneAndUpdate({ day }, ))
  //         updateObj[field] = new Date(update[field] * 1000);
  //         // }
  //       }
  //       console.log('Update for day:', day);
  //       console.log(updateObj);
  //       // updateProms.push(Entry.findOneAndUpdate({ day }, updateObj, { new: true, upsert: true }).exec());
  //       updateProms.push(Entry.update({ day }, updateObj, { upsert: true }).exec());
  //     }
  //   }
    
  //   if (req.body.deletions) {
  //     for (let deletion of req.body.deletions) {
  //       let day = new Date(deletion.day * 1000);
  //       console.log('day:', day);
  //       let deleteObj = {};
  //       for (let field of deletion.fields) {
  //         if (field !== 'day') {
  //           deleteObj[field] = 1;
  //         }
  //       }
  //       console.log('Deletion for day:', day);
  //       console.log({ "$unset": deleteObj });
  //       // updateProms.push(Entry.findOneAndUpdate({ day }, { "$unset": deleteObj }, { new: true }));
  //     }
  //   }
  //   Promise.all(updateProms).then((entries) => {
  //     console.log('updateProms:', entries);
  //     // console.log(updateProms);
      
  //     // res.json({ success: true });
  //     // let assocProms = [];
  //     // for (var entry of entries) {
  //     //   console.log(entry.isNew());
  //     // }
      
  //     res.json({ success: true });
  //   });
  // });
  
  router.post('/add', (req, res) => {
    console.log('body:', req.body);
    
    if (!req.body.type || !req.body.data) {
      return res.json({ err: "Type is missing." });
    }
    let data = req.body.data;
    if (req.body.type === 'update') {
      Entry.findOne({ day: new Date(data.day * 1000) })
        .catch((err) => res.json({ err }))
        .then((entry) => {
          console.log('found entry:', entry);
          
          let setupEntry = (ent) => {
            if (data.in_time) {
              ent.in_time = new Date(data.in_time * 1000);
            }
            if (data.out_time) {
              ent.out_time = new Date(data.out_time * 1000);
            }
            if (data.lunch_start) {
              ent.lunch_start = new Date(data.lunch_start * 1000);
            }
            if (data.lunch_end) {
              ent.lunch_end = new Date(data.lunch_end * 1000);
            }
            return ent;
          };
          
          if (entry) {
            entry = setupEntry(entry);
            entry.save()
              .catch((err) => res.json({ err }))
              .then((_entry) => {
                console.log('entry has been updated:', _entry);
                res.json({ success: true, data: _entry });
              });
          } else {
            entry = setupEntry(new Entry({
              day: new Date(data.day * 1000)
            }));
            entry.save()
              .catch((err) => res.json({ err }))
              .then((_entry) => {
                console.log('entry has been created:', _entry);
                res.json({ success: true, data: _entry });
              });
          }
        });
    } else if (req.body.type === 'deletion') {
      Entry.findOne({ day: new Date(data.day * 1000) })
        .catch((err) => res.json({ err }))
        .then((entry) => {
          console.log('entry:', entry);
          if (entry) {
            for (let field of data.fields) {
              entry[field] = undefined;
            }
            console.log('new entry:', entry);
            // res.json({ success: true, data: entry });
            entry.save()
              .catch((err) => res.json({ err }))
              .then((_entry) => {
                console.log('saved entry:');
                res.json({ success: true, data: _entry });
              });
          } else {
            res.json({ err: "This entry does not exist." });
          }
        });
    }
  });
  
  return router;
}