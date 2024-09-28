
const express = require("express");
const {register, login, verifyEmail} = require("../controllers/user");
const { registerValidation, validation, loginValidation } = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");
const user = require("../models/user.js");
const authorizeRole = require("../middleware/authorizeRole.js");
const canUpdateUser = require("../middleware/canUpdateUser.js");
const { requestPasswordReset, resetPassword } = require("../controllers/passwordReset.js");
const upload = require('../middleware/upload'); // Adjust path as necessary
const router = express.Router();


// REGISTER USER
router.post('/register', upload.single('photo'), validation, register);

// Email verification route
router.get('/verify/:token', verifyEmail);

// LOGIN
router.post('/login', loginValidation(), validation, login)

// REQUEST PASSWORD RESET
router.post('/forgot-password', requestPasswordReset);

// RESET PASSWORD
router.put('/reset-password/:token', resetPassword);

// get all users 

router.get('', async(req,res)=>{
    try {
        const data = await user.find();
        res.status(200).send ({msg : "all users", data})
        
    } catch (error) {
        res.status(400).send({msg : "cannot show users", error});
    }
});

// Get current user

router.get('/current', isAuth, (req, res) => {
    if (!req.user) {
        return res.status(401).send("User not authenticated");
    }

    // Send a JSON response with user details
    res.status(200).json({
        user: {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            role: req.user.role,
            photo:req.user.photo
        }
    });
});

//DELETE USER

router.delete('/:_id', authorizeRole("admin"),async (req,res) =>{
    try {
        const {_id}= req.params;
        const deleteUser = await user.findById(_id);
        if (!deleteUser) {
        return res.status(404).send({ msg: "user already deleted or does not exist" });
        }
        await user.findOneAndDelete({_id});
        res.status(200).send ({msg : "user has been deleted"})
    } catch (error) {
        res.status(400).send({msg : " user cannot be deleted"})
    }
})

// UPDATE USER
router.get('/user-activity', async (req, res) => {
    try {
      // Aggregation pipeline to get user activity
      const activityData = await user.aggregate([
        { $unwind: "$activity" }, // Unwind activity array
        { $group: {
            _id: {
              type: "$activity.type",
              month: { $month: "$activity.timestamp" },
              year: { $year: "$activity.timestamp" }
            },
            count: { $sum: 1 } // Count occurrences of each activity type per month/year
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } } // Sort by year and month
      ]);
  
      // Log the result for debugging
      console.log(activityData);
  
      res.status(200).send({ msg: "User activity data", data: activityData });
    } catch (error) {
      res.status(400).send({ msg: "Cannot get user activity data", error });
    }
  });


router.put('/:_id', isAuth, canUpdateUser, async (req, res) => {
    try {
        const { _id } = req.params;
        const result = await user.updateOne({ _id }, { $set: { ...req.body } });
        res.status(200).send({ msg: "User's data is updated" });
    } catch (error) {
        res.status(400).send({ msg: "Cannot update the user's data", error });
    }
});

// Get user by ID
router.get('/:id', async(req,res) =>{
    try {
        const data = await user.findOne({_id : req.params.id});
        res.status (200).send ({msg : "the user is", data});
    
    } catch (error) {
        res.status (400).send ({msg: "cannot get user ", error})
    }
})
router.put('/status/:id', authorizeRole('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Expecting status to be 'active' or 'blocked'

        if (!['active', 'blocked'].includes(status)) {
            return res.status(400).send({ msg: "Invalid status!" });
        }

        const updatedUser = await user.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ msg: "User not found!" });
        }

        res.status(200).send({ msg: "User status updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).send({ msg: "Cannot update user status", error });
    }
});
module.exports = router;