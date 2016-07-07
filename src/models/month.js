import mongoose from 'mongoose';
import { Entry } from './entry';

var monthSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  }]
});

monthSchema.pre('remove', function(next) {
  let proms = [];
  for (let entry of this.entries) {
    let entryID;
    if (typeof entry === "string") {
      entryID = entry;
    } else {
      entryID = entry._id;
    }
    Entry.remove({ "_id": entryID }, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  }
});

export const Month = mongoose.model('Month', monthSchema);