const express = require("express");
const router = express.Router();
require("../db/conn");
const hashing = require("bcryptjs");
const User = require("../model/userSchema");
const Menu = require("../model/menuSchema");
const Admin = require("../model/adminSchema");
const authenticate = require("../middlewares/authenticate");
const authenticate1 = require("../middlewares/authenticate1");
const authenticate2 = require("../middlewares/authenticate2");
const TodaySpecial = require("../model/todaySpecialSchema");
const Message = require("../model/messageSchema");

//USER ROUTERS-----------------------------------------------------//
router.post(`/Register`, async (req, res) => {
  const { table, name, phone } = req.body;
  if (!table || !name || !phone) {
    return res
      .status(422)
      .json({ status: 422, error: "please fill all required field" });
  }
  try {
    let token;
    const user = new User({ table, name, phone }); //taking input
    await user.save(); //saving input
    const userExist = await User.findOne({ phone: phone });
    token = await userExist.generateAuthToken();
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });
    res
      .status(201)
      .json({ status: 201, message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});
router.get(`/Home`, authenticate, async (req, res) => {
  return res.send(req.rootUser);
});
router.get("/getdata", authenticate, async (req, res) => {
  return res.send(req.rootUser);
});
router.post(`/Home/Menu`, authenticate, async (req, res) => {
  try {
    const { title, price, img, quantity } = req.body;
    const userExist = await User.findOne({ _id: req.userID });
    if (userExist) {
      let findItem = await userExist.findItem(title);
      if (!findItem) {
        let itemName = await userExist.addItems(title, price, img, quantity);
        if (itemName) {
          return res
            .status(201)
            .json({ status: 201, message: "item added to cart" });
        } else {
          return res
            .status(421)
            .json({ status: 422, error: "Some Error Occured!" });
        }
      } else {
        return res
          .status(422)
          .json({ status: 421, error: "item already in cart" });
      }
    }
  } catch (err) {
    res.send("error adding to cart");
  }
});
router
  .get("/Home/Cart", authenticate, async (req, res) => {
    return res.send(req.rootUser);
  })
  .post(`/Home/Cart`, authenticate, async (req, res) => {
    try {
      const { items } = req.body;
      const userExist = await User.findOne({ _id: req.userID });
      let itemName = await userExist.invoiceItems();
      const userCart = await User.updateOne(
        { _id: req.userID },
        { $pull: { cart: {} } }
      );
      if (userCart) {
        return res
          .status(201)
          .json({ status: 201, error: "Ordered successfully" });
      } else {
        return res
          .status(422)
          .json({ status: 400, error: "Some Error Occured!" });
      }
    } catch (err) {
      res.send("error adding to cart");
    }
  })
  .post(`/Home/Cart/Delete`, authenticate, async (req, res) => {
    const { title, price } = req.body;
    const userExist = await User.updateOne(
      { _id: req.userID },
      { $pull: { cart: { title, price } } }
    );
    if (userExist) {
      return res.status(201).json({ status: 201, error: "item removed" });
    } else {
      return res
        .status(422)
        .json({ status: 400, error: "Some Error Occured!" });
    }
  })
  .post(`/Home/Cart/Add`, authenticate, async (req, res) => {
    try {
      const { title, price, quantity } = req.body;
      const userExist = await User.findOne({
        _id: req.userID,
        title: title,
        price: price,
      });
      let addd = await userExist.addquantity(title, price, quantity);
      if (addd) {
        return res.status(201).json({
          status: 201,
          error: "item added",
          quantity: addd.quantity,
          index: addd.index,
          title: addd.title,
          price: addd.price,
        });
      } else {
        return res
          .status(422)
          .json({ status: 400, error: "Some Error Occured!" });
      }
    } catch (err) {
      console.log(err);
    }
  })
  .post(`/Home/Cart/Sub`, authenticate, async (req, res) => {
    try {
      const { title, price, quantity } = req.body;
      const userExist = await User.findOne({
        _id: req.userID,
        title: title,
        price: price,
      });
      let addd = await userExist.subquantity(title, price, quantity);
      if (addd) {
        return res.status(201).json({
          status: 201,
          error: "item removed",
          quantity: addd.quantity,
          index: addd.index,
          title: addd.title,
          price: addd.price,
        });
      } else {
        return res
          .status(422)
          .json({ status: 400, error: "Some Error Occured!" });
      }
    } catch (err) {
      console.log(err);
    }
  });
router.get("/Home/Invoice", authenticate, async (req, res) => {
  return res.send(req.rootUser);
});
router.get("/Message", async (req, res) => {
  try {
    let data = await Message.find();
    return res.json(data );
  } catch (err) {
    console.log(err);
  }
});
router.post("/Message", authenticate, async (req, res) => {
  try {
    const { table, message } = req.body;
    const userExist = await User.findOne({ _id: req.userID });
    if (userExist) {
      const sendMessage = new Message({ table, message });
      await sendMessage.save();
    }
    return res
      .status(201)
      .json({ status: 201, message: "message send successfully" });
  } catch (err) {
    console.log(err);
  }
});
router.get("/Delete",async(req,res)=>{
  try{
    const userExist = await Message.deleteMany({});
      if (userExist) {
        return res.status(201).json({ status: 201, error: "item removed" });
      } else {
        return res
          .status(422)
          .json({ status: 400, error: "Some Error Occured!" });
      }
  }catch(err){
    console.log(err);
  }
})

//ADMIN ROUTERS----------------------------------------------------//
router.post(`/AdminRegister`, async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res
      .status(422)
      .json({ status: 422, error: "please fill all required field" });
  }
  try {
    const userEmailExist = await Admin.findOne({ email: email });
    const userPhoneExist = await Admin.findOne({ phone: phone });
    if (userEmailExist) {
      return res
        .status(422)
        .json({ status: 400, error: "Email already registered!" });
    } else if (userPhoneExist) {
      return res
        .status(422)
        .json({ status: 401, error: "Phone no. already registered!" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({ status: 402, error: "passwords are not matching" });
    }
    const user = new Admin({ name, email, phone, password, cpassword }); //taking input
    await user.save(); //saving input
    res
      .status(201)
      .json({ status: 201, message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});
router.post("/Adminlogin", async (req, res) => {
  let token;
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ status: 422, error: "please fill all required field" });
  }
  try {
    const userExist = await Admin.findOne({ email: email }); //checking email validation
    if (!userExist) {
      return res
        .status(422)
        .json({ status: 400, error: "invalid credentails" });
    } else {
      const isMatch = await hashing.compare(password, userExist.password); //checking password credentials
      token = await userExist.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });
      if (!isMatch) {
        return res
          .status(422)
          .json({ status: 400, error: "invalid credentails" });
      } else {
        return res
          .status(200)
          .json({ status: 200, message: "login successful" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/Adminlogout",authenticate1,async (req, res) => {
  res.clearCookie("jwtoken", { path: "/admindashboard" });
  await Admin.updateOne({_id:req.adminID},{ $pull: { tokens: { } } });
  return res.status(200).send("Logout Successful");
});
router.get("/Admingetdata", authenticate1, async (req, res) => {
  return res.send(req.rootAdmin);
});
router.get("/Menu", authenticate2, async (req, res) => {
  return res.send(req.rootMenu);
});
router.get("/TodaySpecial", authenticate2, async (req, res) => {
  return res.send(req.rootTodaySpecial);
});
router.post("/Adminhome", authenticate1, async (req, res) => {
  try {
    const { title, price, quantity, img, description, category } = req.body;
    const userContact = await Admin.findOne({ _id: req.adminID });
    if (userContact) {
      const item = new Menu({
        title,
        price,
        quantity,
        img,
        description,
        category,
      }); //taking input
      await item.save();
      return res
        .status(201)
        .json({ status: 201, message: "item added successfully" });
    } else {
      return res
        .status(422)
        .json({ status: 400, error: "Some Error Occured!" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/Admintodayspecial", authenticate1, async (req, res) => {
  try {
    const { title, price, quantity, img, description, category } = req.body;
    const userContact = await Admin.findOne({ _id: req.adminID });
    if (userContact) {
      const item = new TodaySpecial({
        title,
        price,
        quantity,
        img,
        description,
        category,
      }); //taking input
      await item.save();
      return res
        .status(201)
        .json({ status: 201, message: "item added successfully" });
    } else {
      return res
        .status(422)
        .json({ status: 400, error: "Some Error Occured!" });
    }
  } catch (err) {
    console.log(err);
  }
});
router
  .get("/AdminUserAccess", authenticate1, async (req, res) => {
    try {
      const data = await User.find();
      return res.send(data);
    } catch (err) {
      console.log(err);
    }
  })
  .post("/AdminUserAccess", authenticate1, async (req, res) => {
    try {
      const { table } = req.body;
      const userExist = await User.deleteMany({ table: table });
      if (userExist) {
        return res.status(201).json({ status: 201, error: "item removed" });
      } else {
        return res
          .status(422)
          .json({ status: 400, error: "Some Error Occured!" });
      }
    } catch (err) {
      console.log(err);
    }
  });
router
  .get("/AdminMenuEdit", authenticate2, async (req, res) => {
    return res.send(req.rootMenu);
  })
  .post("/adminMenuEdit/Delete", authenticate1, async (req, res) => {
    const { title } = req.body;
    const userExist = await Menu.deleteOne({ title: title });
    if (userExist) {
      return res.status(201).json({ status: 201, error: "item removed" });
    } else {
      return res
        .status(422)
        .json({ status: 400, error: "Some Error Occured!" });
    }
  });
router
  .get("/AdminTodaySpecialEdit", authenticate2, async (req, res) => {
    return res.send(req.rootTodaySpecial);
  })
  .post("/AdminTodaySpecialEdit/Delete", authenticate1, async (req, res) => {
    const { title } = req.body;
    const userExist = await TodaySpecial.deleteOne({ title: title });
    if (userExist) {
      return res.status(201).json({ status: 201, error: "item removed" });
    } else {
      return res
        .status(422)
        .json({ status: 400, error: "Some Error Occured!" });
    }
  });

module.exports = router;
