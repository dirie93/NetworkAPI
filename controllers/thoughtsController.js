const { Thought, User } = require("../models");

const thoughtsController = {
  // Function to retrieve all thoughts
  listThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve thoughts!" });
    }
  },

  // Function to get a thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ error: "Thought is not found" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve thought!" });
    }
  },

  // Function to create a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create thought!" });
    }
  },

  // Function to update a thought by ID
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!thought) {
        return res.status(404).json({ error: "Thought is not found" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update thought!" });
    }
  },

  // Function to delete a thought by ID
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ error: "Thought is not found" });
      }
      await User.findByIdAndUpdate(thought.userId, {
        $pull: { thoughts: thought._id },
      });
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete thought!" });
    }
  },

  // Function to add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: "Thought is not found" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add reaction!" });
    }
  },

  // Function to remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: "Thought is not found" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to remove reaction!" });
    }
  },
};

module.exports = thoughtsController;
