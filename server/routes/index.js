let express = require('express');
let router = express.Router();

/* GET landing page. */

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
/* GET landing page. */
router.get('/home', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
router.get('/add', (req, res, next) => {
  res.render('assignments/add', { title: 'Add' });
}); 
router.get('/Confirm', (req, res, next) => {
  res.render('ConfirmDel', { title: 'Add' });
}); 


module.exports = router;
