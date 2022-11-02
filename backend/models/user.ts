/* eslint-disable no-underscore-dangle */
import { Schema, model } from "mongoose";
import type { User } from "../types/userTypes.js";

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        delete returnedObject.passwordHash;
      },
    },
  }
);

const UserModel = model<User>("User", userSchema);

export default UserModel;
