const router = require("express").Router();
const ctrl = require("./user.ctrl");

router.get("/msg/in/:user_id", ctrl.push_my_message);
router.get("/msg/out/:user_id", ctrl.pop_my_message);

module.exports = router;
