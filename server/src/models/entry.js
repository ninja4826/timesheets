import mongoose from 'mongoose';
import { Month } from './month';

var entrySchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true
  },
  day_num: {
    type: Number
  },
  in_time: Date,
  out_time: Date,
  lunch_start: Date,
  lunch_end: Date,
  month: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Month'
  }
});

// entrySchema.pre('update', function() {
//   console.log('I am being updated.');
//   let update = this.getUpdate()['$set'];
//   let newUpdate = {
//     day_num: update.day.getDate(),
//   };
//   let num = update.day.getMonth() + 1;
//   let year = update.day.getFullYear();
//   Month.findOne({ num, year })
//     .then((month) => {
//       if (month) {
//         newUpdate.month = month._id;
//       }
//     });
// });

entrySchema.post('update', function() {
  console.log('I have been updated.');
  console.log(this.getUpdate());
});

entrySchema.pre('save', true, function(next, done) {
  if (!('day' in this)) {
    return next(new Error("'day' required."));
  }
  console.log('pre save');
  if (!this.day_num) {
    console.log('setting day_num');
    this.day_num = this.day.getDate();
  }
  done();
  if (!this.month) {
    console.log('setting month');
    let num = this.day.getMonth() + 1;
    let year = this.day.getFullYear();
    
    Month.findOne({ num, year })
      .catch((err) => next(err))
      .then((month) => {
        if (month) {
          this.month = month._id;
          month.entries.push(this._id);
          month.save()
            .catch((err) => next(err))
            .then((newMonth) => {
              next();
            });
        } else {
          month = new Month({ num, year, entries: [this._id] });
          month.save()
            .catch((err) => next(err))
            .then((newMonth) => {
              this.month = newMonth._id;
              next();
            });
        }
      });
  } else {
    next();
  }
});

entrySchema.post('save', (doc, next) => {
  let hasData = false;
  if ('in_time' in doc) hasData = true;
  if ('out_time' in doc) hasData = true;
  if ('lunch_start' in doc) hasData = true;
  if ('lunch_end' in doc) hasData = true;
  
  if (!hasData) {
    console.log('no data');
    let monthID;
    if (typeof doc.month === "string") {
      monthID = doc.month;
    } else {
      monthID = doc.month._id;
    }
    
    Month.findOne({ "_id": monthID }).populate('entries')
      .catch((err) => next(err))
      .then((month) => {
        month.entries.id(doc._id).remove();
        doc.remove((err) => {
          if (err) {
            return next(err);
          }
          next();
        });
      });
  } else {
    next();
  }
});

entrySchema.options.toObject = {
  transform: (doc, ret, opts) => {
    ret['day'] = doc.day.getTime() / 1000;
    if (doc.in_time) ret['in_time'] = doc.in_time.getTime() / 1000;
    if (doc.out_time) ret['out_time'] = doc.out_time.getTime() / 1000;
    if (doc.lunch_start) ret['lunch_start'] = doc.lunch_start.getTime() / 1000;
    if (doc.lunch_end) ret['lunch_end'] = doc.lunch_end.getTime() / 1000;
    
    return ret;
  }
};

export const Entry = mongoose.model('Entry', entrySchema);