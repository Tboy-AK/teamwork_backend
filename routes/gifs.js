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
router.delete('/gifs/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = 'Gif post successfully deleted';
      const id = parseInt(req.params.id, 10);

      pool.query('SELECT * FROM gifs WHERE gifs.id=$1 AND author_id IN (SELECT user_id FROM users WHERE email=$2);',
        [id, authData.email], (errAuth, resAuth) => {
          if (errAuth) { throw errAuth; } else if (resAuth.rows.length !== 0) {
            pool.query('SELECT image_url FROM gifs WHERE id=$1 AND author_id=$2',
              [id, resAuth.rows[0].author_id], (error, res) => {
                if (error) { throw error; }
                cloudinary.uploader.destroy(res.rows[0].image_url.split('//')[1].split('/')[5].split('.')[0],
                  (errUpDelete) => {
                    if (errUpDelete) { throw errUpDelete; } else {
                      pool.query('DELETE FROM gifs WHERE id=$1 AND author_id=$2',
                        [id, resAuth.rows[0].author_id], (errDelete) => {
                          if (errDelete) { throw errDelete; }
                          resp.status(200).send({ status, data: { message } });
                        });
                    }
                  });
              });
          } else resp.send('Unauthorized access!');
        });
    }
  });
});

//  employees can view a specific gif
router.get('/gifs/:id', (req, resp) => {
  resp.json({ message: 'view a specific gif' });
});

//  employees can comment on other colleagues' gif post
router.post('/gifs/:id/comments', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = 'Comment successfully created';
      const { comment } = req.body;
      const gifID = parseInt(req.params.id, 10);
      const createdOn = new Date();

      pool.query('SELECT title from gifs WHERE id=$1', [gifID], (errorGif, resGif) => {
        if (errorGif) { throw errorGif; }
        const { title } = resGif.rows[0];
        pool.query('SELECT user_id from users WHERE email=$1', [authData.email], (errorID, resID) => {
          if (errorID) { throw errorID; }
          const commentatorID = resID.rows[0].user_id;
          pool.query('INSERT INTO gif_comments (created_on, gif_title, gif_id, comment, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [createdOn.toLocaleDateString(), title, gifID, comment, commentatorID],
            (error, res) => {
              if (error) { throw error; }
              resp.status(201).send({
                status,
                data: {
                  message,
                  createdOn: res.rows[0].created_on,
                  gifTitle: res.rows[0].gif_title,
                  comment: res.rows[0].comment,
                },
              });
            });
        });
      });
    }
  });
});

module.exports = router;
