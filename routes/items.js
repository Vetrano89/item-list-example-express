var express = require('express');
var router = express.Router();

let items = [];

router.post('/add', (req, res) => {
  const newItem = req.body.newItem;
  const previousListLength = [...items].length;
  items.unshift(newItem);
  if (previousListLength === items.length) {
    res.status(422);
    res.send(`Something went wrong. The item wasn't added to the list.`)
  } else {
    res.send(JSON.stringify(items));
  }
});

router.post('/delete', (req, res) => {
  const newItemList = items.filter((listItem, currentListItemIndex) => (
    currentListItemIndex !== req.body.itemIndex
  ));
  if (newItemList.length === items.length) {
    res.status(422);
    res.send('The item index may not have been found.  Did you send the correct item index?')
  } else {
    items = newItemList;
    res.send(JSON.stringify(items));
  }
})

router.get('/', (req, res) => {
  res.send(JSON.stringify(items));
});

module.exports = router;