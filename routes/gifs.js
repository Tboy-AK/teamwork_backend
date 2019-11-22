const cloudinary = require('cloudinary').v2;
const { router } = require('../router');
const pool = require('../elephantsql');
const tokenOrigin = require('../token/token');

// response message
let message;

// response status
const status = 'success';

// cloudinary configuration
cloudinary.config(tokenOrigin.cloudinaryCred);

// employee can create gif
router.post('/gifs', tokenOrigin.verifyToken, (req, resp) => {
  message = 'GIF image successfully posted';
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      const { image, title } = req.body;
      const createdOn = new Date();

      // upload image to cloudinary
      cloudinary.uploader.upload(image,
        {
          transformation: {
            width: 150,
            height: 150,
            crop: 'limit',
          },
        },
        (errUpload, resUpload) => {
          if (errUpload) { throw errUpload; } else {
            console.log(resUpload.url);

            //  send required image info to database  //
            pool.query('SELECT user_id from users WHERE email=$1', [authData.email], (errorID, resID) => {
              if (errorID) { throw errorID; }
              const authorID = resID.rows[0].user_id;
              pool.query('INSERT INTO gifs (created_on, title, image_url, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [createdOn.toLocaleDateString(), title, resUpload.url, authorID],
                (error, res) => {
                  if (error) { throw error; }
                  resp.status(201).send({
                    status,
                    data: {
                      gifId: res.rows[0].id,
                      message,
                      createdOn: res.rows[0].created_on,
                      title: res.rows[0].title,
                      imageURL: res.rows[0].image_url,
                    },
                  });
                });
            });
          }
        });
    }
  });
});

//  employees can delete their gifs
router.delete('/gifs/:id', (req, resp) => {
  message = 'gif post successfully deleted';
  resp.json({ message });
});

//  employees can view a specific gif
router.get('/gifs/:id', (req, resp) => {
  resp.json({ message: 'view a specific gif' });
});

//  employees can comment on other colleagues' gif post
router.post('/gifs/:id/comments', (req, resp) => {
  message = 'Comment successfully created';
  resp.json({ message });
});

module.exports = router;
