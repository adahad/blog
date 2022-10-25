namespace Express {
  interface Request {
    token?: string;
    user?: Document<unknown, any, User> &
      User & {
        _id: Types.ObjectId;
      };
  }
}
