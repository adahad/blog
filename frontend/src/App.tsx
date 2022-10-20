import Posts from "./components/Posts/Posts";
import testData from "./tests/testData.json";
import type { Post } from "./types";

function App() {
  const testPosts: Post[] = testData.samplePosts;

  return (
    <div>
      <Posts posts={testPosts} />
    </div>
  );
}
export default App;
