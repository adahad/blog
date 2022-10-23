/* eslint-disable no-underscore-dangle */
import { Schema, model } from "mongoose";
import { Post } from "../types";

const postSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, object-shorthand, func-names
      transform: function (_document, returnedObject) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        delete returnedObject._id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        delete returnedObject.__v;
      },
    },
  }
);

const PostModel = model<Post>("Post", postSchema);

// postSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

export default PostModel;
