import type { Post } from "../types";
// import testData from "./testData.json";
import postsReducer, { postsSet, postAdded } from "../redux/postsSlice";

describe("posts reducer", () => {
  const testPosts: Post[] = [
    {
      title: "title1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nEtiam tempor orci eu lobortis elementum.",
      id: "a",
    },
    {
      title: "title2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nIn pellentesque massa placerat duis ultricies lacus sed turpis.",
      id: "b",
    },
  ];
  // const testPosts: Post[] = testData.samplePosts;

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
