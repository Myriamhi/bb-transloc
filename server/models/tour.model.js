var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var tour = new Schema({
  //  _id: String,
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    nameTour: {type: String, default: ['']},

  },
  {
    timestamps: true
  });

tour.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Tour', tour);
