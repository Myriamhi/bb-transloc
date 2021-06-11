var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    UserEntry    = require('../models/userEntry.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken'),
    nameObject = 'userEntry'

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err)
})

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization']
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: 'Authentication failed',
        error: err
      })
    }
    if (!decoded) {
      return res.status(404).json({
        title: 'Authentication Failed',
        error: {message: 'Authentication failed, malformed jwt'}
      })
    }
    if (decoded) {
      User
      .findById(decoded.user._id)
      .populate({ path: 'userEntrys', model: 'UserEntry'})
      .populate({ path: 'ownerCompanies', model: 'Companie'})
      .populate({ path: 'rights', model: 'Right'})
      .exec(function (err, doc) {
        if (err) {
          return res.status(500).json({
            message: 'Fetching user failed',
            err: err
          })
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {message: 'The user was not found'}
          })
        }
        if(!shared.isCurentUserHasAccess(doc, nameObject, 'read')) {
          return res.status(404).json({
            title: 'No userEntrys',
            error: {message: 'No userEntrys'}
          })
        }
        if (doc) {
          req.user = doc
          next()
        }
      })
    }
  })
})



//update
router.put('/:id', function (req, res, next) {

  UserEntry.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {

        item.tours = req.body.tours
        item.dateUserEntry = req.body.dateUserEntry
        item.info1 = req.body.info1
        item.info2 = req.body.info2
        item.info3 = req.body.info3
        item.info4 = req.body.info4
        item.info5 = req.body.info5
        item.info6 = req.body.info6
        item.info7 = req.body.info7
        item.info8 = req.body.info8
        item.info9 = req.body.info9
        item.info10 = req.body.info10
        item.info11 = req.body.info11
        item.info12 = req.body.info12


        item.save(function (err, result) {
          if (err) {
            return res.status(404).json({
              message: 'There was an error, please try again',
              err: err
            })
          }
          UserEntry
          .findById({_id: result._id})
          .populate({path: 'tours', model: 'Tour'})
          .exec(function (err, item) {
            if (err) {
              return res.status(404).json({
                message: '',
                err: err
              })
            } else {
              res.status(200).json({
                message: 'Success',
                item: item
              })
            }
          })
        })

    }
  })
})

router.post('/', function (req, res, next) {
  if(!req.user.ownerCompanies.length) {
    return res.status(404).json({
      message: 'You must belong to a companie',
      err: ''
    })
  }
   // console.log(req.user.companies)
  //var UserEntry = new UserEntry(req.body)
  var userEntry = new UserEntry(req.body)
  userEntry.ownerCompanies = req.user.ownerCompanies
  userEntry.users = req.user._id
  userEntry.save(function (err, result) {
    if (err) {
      console.log(err)
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'Error'}
      })
    }

    UserEntry
    .findById({_id: result._id})
    .populate({path: 'tours', model: 'Tour'})
    .exec(function (err, item) {
      if (err) {
        return res.status(404).json({
          message: '',
          err: err
        })
      } else {
        res.status(200).json({
          message: 'Success',
          item: item
        })
      }
    })




  })
})




// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 15
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)

  let searchQuery = {
  //  createdAt:{"$lt": dateRef}
//    categories: categoriesArray,
  //  createdAt:{"$gt": dateRef},
  }
  searchQuery['ownerCompanies'] = req.user.ownerCompanies


  if (req.query.search) {
    searchQuery['nameUserEntry'] = new RegExp(req.query.search, 'i')
  }



  UserEntry
  .find(searchQuery)
  .sort('-createdAt')
  .populate({path: 'tours', model: 'Tour'})
  .populate({path: 'users', model: 'User'})
  .limit(itemsPerPage)
  .skip(skip)
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No results',
        err: err
      })
    } else {
      UserEntry
      .find(searchQuery)
      .count()
      .exec(function (err, count) {
      res.status(200).json({
          paginationData : {
            totalItems: count,
            currentPage : currentPage,
            itemsPerPage : itemsPerPage
          },
          data: item
        })
      })
    }
  })
})




// getting user forms to display them on front end
router.get('/:id', function (req, res, next) {
  UserEntry
  .findById({_id: req.params.id})
  .populate('forms')
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {
      res.status(200).json({
        message: 'Success',
        item: item
      })
    }
  })
})





router.delete('/:id', function (req, res, next) {
  UserEntry.findById((req.params.id), function (err, item) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!item) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      })
    }

    // deleting the form from the database
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      res.status(200).json({
        message: 'Item is deleted',
        obj: result
      })
    })
  })
})



module.exports = router
