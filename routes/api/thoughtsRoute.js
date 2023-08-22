const router = require("express").Router();

const {
  listThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// Retrieving all thoughts
router.route("/").get(listThoughts).post(createThought);

// Retrieve a thought by ID
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Adding a reaction to a thought by ID
router.route("/:thoughtId/reactions").post(addReaction);

// Deleting a reaction from a thought by thought ID and reaction ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
