import { Post } from "../models/user.model.js"; // on prend le Post de ton fichier unique
import mongoose from "mongoose";

// ------------------ CREATE POST ------------------
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // req.user sera défini par le middleware auth
    const post = await Post.create({ title, content, author: req.user._id });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ GET ALL POSTS ------------------
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email") // pour voir qui a posté
      .sort({ createdAt: -1 }); // posts récents en premier

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ DELETE POST ------------------
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // vérifier l'ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
