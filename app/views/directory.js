const openbadger = require('../lib/openbadger');
const Badge = require('../models/badge')("DATABASE");
const async = require('async');
const middleware = require('../middleware');
const url = require('url');

const PAGE_SIZE = 12;

exports.home = function home (req, res, next) {
  function handleResults (err, badges) {
    if (err)
      return res.send(500, err);

    const startIndex = (pageNum-1) * PAGE_SIZE;
    const pages = Math.ceil(badges.length / PAGE_SIZE);

    badges = badges.slice(startIndex, startIndex + PAGE_SIZE);

    return res.render('directory/home.html', { badges: badges, page: pageNum, pages: pages, category: category });
  }

  const pageNum = parseInt(req.query.page) || 1;
  const category = req.query.category || 'draft';

  switch (category) {
    case 'published':
      openbadger.getAllBadges(function (err, data) {
        handleResults(err, data.badges);
      });
      break;
    case 'archived':
      // openbadger does not yet have a concept of archived badges
      handleResults(null, []);
      break;
    case 'template':
      Badge.get({ status: 'template' }, handleResults);
      break;
    default:
      Badge.get({ status: 'draft' }, handleResults);
      break;
  }
};

exports.addBadge = function addBadge (req, res, next) {
  const category  = req.query.category || 'draft';

  Badge.put({ name: 'New Badge', status: category }, function (err, result) {
    var directoryUrl = res.locals.url('directory') + '?category=' + category;
    return middleware.redirect(directoryUrl, 302)(req, res, next);
  });
};
