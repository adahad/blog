import testData from "./tests/testData.json";
import { Post } from "./types";

function App() {
  const testPosts: Post[] = testData.samplePosts;

  return (
    <div>
      {testPosts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
}
export default App;
