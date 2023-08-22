const router = require("express").Router();

const {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// Retrieve all users through the GET method, whilst new users is created through POST method
router.route("/").get(listUsers).post(createUser);

// Attain user info by ID through GET method & update a user by their ID using PUT method. The user can delete a user by ID using DELETE method
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// User can add a friend by their ID via POST method. User can also remove a friend by either their user ID or their friend ID using DELETE method
// router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
