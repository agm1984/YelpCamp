var Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user');

var campgroundData = [
  {
    name: 'Humid Field',
    image: 'https://farm6.staticflickr.com/5479/11694969344_42dff96680.jpg',
    description: "Great place to go fishin' as long as you brought the correct ingredients!"
    },
  {
    name: 'Jagged-beds Hill',
    image: 'https://farm5.staticflickr.com/4103/5088123249_5f24c3202c.jpg',
    description: "It's just a hill.  Made of granite.  Nothing more! Cow doner."
    },
  {
    name: 'Crowded Crescent',
    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
    description: 'All campsites.  All the time.Short ribs pastrami drumstick.'
    },
  {
    name: 'Wastewater Pumping Station',
    image: 'https://farm7.staticflickr.com/6138/6042439726_9efecf8348.jpg',
    description: 'Hills and lakes and lakes and hills.  Pork ribeye pork chop.'
    }
];

var commentData1 = [
  {
    text: 'This place is great',
    author: 'Homer'
    },
  {
    text: 'I had a dcent time except when sleeping; overall, would experience again/10',
    author: 'Sally'
    },
  {
    text: 'Amazing place to hang out and annoy people in the sun!',
    author: 'Fredico'
    },
  {
    text: 'In all my years, I\'ve never seen anything because I was born blind :(',
    author: 'Sven'
    }
];

var commentData2 = [
  {
    text: 'Great place--I wouldn\'t go there however!',
    author: 'Ralph Segal'
    },
  {
    text: 'I had serious troubles traversing this landscape especially with all the loud noises around...',
    author: 'Grandpa Franzeeto'
    },
  {
    text: 'I found a bug while I was staying over night!',
    author: 'Ralph'
    },
  {
    text: 'Too much water, not enough dehydrated sand packets available at the market',
    author: 'Apu'
    }
];

function seedDB() {
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed campgrounds!');
      Comment.remove({}, function(err) {
        if (err) {
          console.log(err);
        } else {
          campgroundData.forEach(function(seed, thisArg) {
            Campground.create(seed, function(err, campgroundResponse) {
              if (err) {
                console.log(err);
              } else {
                Comment.create(commentData1[thisArg], function(err, comment) {
                  if (err) {
                    console.log(err);
                  } else {
                    campgroundResponse.comments.push(comment);
                  }
                });
                Comment.create(commentData2[thisArg], function(err, comment2) {
                  if (err) {
                    console.log(err);
                  } else {
                    campgroundResponse.comments.push(comment2);
                    campgroundResponse.save();
                  }
                });
              }
            });
            console.log('Added campground');
          });
        }
      });
    }
  });
  User.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('User database cleared');
    }
  });

}

module.exports = seedDB;
