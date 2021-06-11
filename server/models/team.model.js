var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Tour                    = require('../models/tour.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var team = new Schema({
  //  _id: String,
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    nameTeam: {type: String, default: ['']},
    tours: [{type: Schema.Types.ObjectId, ref: 'Tour'}],

  },
  {
    timestamps: true
  });

team.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Team', team);
