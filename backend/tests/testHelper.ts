import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import PostModel from "../models/post";
import UserModel from "../models/user";
import { PostBase, IdPost, UserSignup } from "../types";

dotenv.config();

const initialPosts: PostBase[] = [
  {
    title: "title1",
    content: "content1",
  },
  {
    title: "title2",
    content: "content2",
  },
  {
    title: "title3",
    content: "content3",
  },
];

const initialUsersPlain: UserSignup[] = [
  {
    name: "name1",
    username: "username1",
    password: "password1",
  },
  {
    name: "name2",
    username: "username2",
    password: "password2",
  },
];

const getDbPosts = async (): Promise<IdPost[]> => {
  const posts = await PostModel.find({});
  return posts.map((post) => post.toJSON());
};

const initializeDbWithUsers = async () => {
  await PostModel.deleteMany({});
  await UserModel.deleteMany({});

  const saltRounds = 10;

  const passwordHashes = initialUsersPlain.map((user) =>
    bcrypt.hash(user.password, saltRounds)
  );

  await Promise.all(passwordHashes);

  const users = [];

  for (let i = 0; i < initialUsersPlain.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const hash = await passwordHashes[i];
    const newUser = new UserModel({
      username: initialUsersPlain[i].username,
      passwordHash: hash,
      name: initialUsersPlain[i].name,
    });
    users.push(newUser.save());
  }

  await Promise.all(users);
};

const initializeDbWithPost = async () => {
  await initializeDbWithUsers();
  const user = await UserModel.findOne({
    username: initialUsersPlain[0].username,
  });

  if (!(user && process.env.SECRET)) {
    throw new Error("Unable to initialize DB");
  }

  const postsObjects = initialPosts.map(
    (post) =>
      new PostModel({
        title: post.title,
        content: post.content,
        // eslint-disable-next-line no-underscore-dangle
        user: user._id,
      })
  );

  const postPromises = postsObjects.map((post) => post.save());
  await Promise.all(postPromises);
};

export {
  initialPosts,
  getDbPosts,
  initialUsersPlain,
  initializeDbWithUsers,
  initializeDbWithPost,
};
