import Posts from "../components/Posts/Posts";
import testData from "../tests/testData.json";
import type { Post } from "../types";

function Home() {
  const testPosts: Post[] = testData.samplePosts;

  return (
    <div>
      <Posts posts={testPosts} />
    </div>
  );
}

export default Home;
