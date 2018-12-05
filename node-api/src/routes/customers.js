var express = require("express");
var router = express.Router();
const { sql, request } = require("../lib/database");
const validateCustomerInput = require("../validation/customer");

/* GET customer listing. */
// const customer = req.id;

router.get("/", async function(req, res, next) {
  const sqlReq = await request();
  try {
    let customerData = await sqlReq.query("select * from credmo.dbo.customer");
    console.dir(customerData);
    return res.send(customerData);

    //res.send('respond with a resource');
  } catch (err) {
    return res.sendStatus(400).json(err);
  }
});
// router.post('/', async function(req, res, next){
//   const sqlquery = await request();
//   try{
//     let
//   }
// })
// router.get("/", async function(req, res, next) {
//   const sqlReq = await request();
//   try {
//     const customerData = await sqlReq
//       .input("id", sql.Int, customer)
//       .query("select * from credmo.dbo.customer where id = @id");
//     console.dir(customerData);
//     return res.send(customerData);

//     //res.send('respond with a resource');
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// });

router.get("/:Id", async function(req, res, next) {
  const sqlReq = await request();
  const customerID = req.params.Id;
  const getCustomer = `SELECT id, first_name, last_name, email, tracking_guid FROM customer WHERE id=${customerID}`;
  try {
    let customerById = await sqlReq.query(getCustomer);

    return res.send(customerById.recordset[0]);
  } catch (err) {
    return res.sendStatus(400).json(err);
  }
});
// Get Customer By GUID
router.get("/id/:uid", async function(req, res, next) {
  const sqlReq = await request();
  const customerGuid = req.params.uid;
  const parsedUid = uuidParse(customerGuid);
  const getCustomer = `SELECT id, first_name, last_name, email, tracking_guid FROM customer WHERE tracking_guid=${parsedUid}`;
  try {
    let customerById = await sqlReq.query(getCustomer);

    return res.send(customerById.recordset[0]);
  } catch (err) {
    return res.sendStatus(400).json(err);
  }
});

router.post("/add", async function(req, res, next) {
  const sqlReq = await request();
  const { first_name, last_name, email, password, tracking_guid } = req.body;
  // guid.replace(/^"(.+(?="$))"$/, "$1");
  const { errors, isValid } = validateCustomerInput(req.body);
  if (!isValid) {
    return res.sendStatus(400).json(errors);
  }
  try {
    const checkEmail = `select * from credmo.dbo.customer where email='${email}'`;
    checked = await sqlReq.query(checkEmail);
    if (checked >= 0) throw Error("Email in use");
  } catch (err) {
    return res.sendStatus(400).json(err);
  }

  const addCustomer = `
      INSERT INTO credmo.dbo.customer(first_name, last_name, email, password, tracking_guid)
      VALUES('${first_name}', '${last_name}', '${email}', '${password}', '${tracking_guid}');
      SELECT SCOPE_IDENTITY() AS id;`;

  try {
    let newCustomer = await sqlReq.query(addCustomer);
    res.send(newCustomer.recordset[0]);
  } catch (err) {
    if (err.originalError.info.number == 2627) {
      res.sendStatus(400).json({ msg: "Credentials already in use" });
    } else if (err.originalError.info.number == 8169) {
      res.sendStatus(400).json({ msg: "Guid is required" });
    } else return res.sendStatus(400).json("Bad data");
  }
});

module.exports = router;
