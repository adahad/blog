/* eslint-disable no-underscore-dangle */
import { Schema, model } from "mongoose";
import { Post } from "../types";

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const PostModel = model<Post>("Post", postSchema);

// postSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

export default PostModel;
