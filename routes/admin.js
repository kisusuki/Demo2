var express = require('express');
const ToyModel = require('../models/ToyModel');
var router = express.Router();

router.get('/admin', async (req, res) => {
  var toys = await ToyModel.find({});

  var total = await ToyModel.count();
  //console.log(mobiles);
  //res.send(mobiles);
  res.render('admin', { toys: toys, total: total })
})

router.get('/list', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('list', { toys: toys });
})

router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    var toys = await ToyModel.find({ title: new RegExp(keyword, "i") })
    res.render('admin', { toys: toys })
 })

router.get('/delete/:id', async (req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id)
    .then(() => { console.log('Delete toy succeed !') })
    .catch((err) => { console.log('Delete toy failed !') });
  res.redirect('/admin');
})

router.get('/drop', async (req, res) => {
  await ToyModel.deleteMany({})
    .then(() => { console.log('Delete all toys succeed !') });

  res.redirect('/admin');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var toy = await ToyModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('order_confirm', { toy: toy, order_quantity: order_quantity, total_price: total_price });
})
router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('homepage', { toys: toys });
})
router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toy = req.body;
  await ToyModel.create(toy)
    .then(() => { console.log('Add new toy succeed !') });
  res.redirect('/admin');
})

router.get('/edit/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id);
  res.render('edit', { toy: toy });
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await ToyModel.findByIdAndUpdate(id, updatedData)
    .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/admin');
})

module.exports = router;