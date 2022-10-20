import type { Post } from "../types";
import * as testData from "./testData.json";
import postsReducer, { postsSet, postAdded } from "../redux/postsSlice";

describe("posts reducer", () => {
  const testPosts: Post[] = testData.samplePosts;

  it("should set notes correctly", () => {
    const result = postsReducer(undefined, postsSet(testPosts));
    expect(result).toEqual(testPosts);
  });

  it("should add post correctly", () => {
    const newPost = {
      title: "title",
      content: "content",
      id: "abc",
    };
    const result = postsReducer(testPosts, postAdded(newPost));
    expect(result).toEqual(testPosts.concat(newPost));
  });
});
