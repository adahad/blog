import { AppShell } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import Posts from "../components/Posts/Posts";
import testData from "../tests/testData.json";
import type { Post } from "../types";

function Home() {
  const testPosts: Post[] = testData.samplePosts;

  return (
    <AppShell navbar={<Navbar />}>
      <Posts posts={testPosts} />
    </AppShell>
  );
}

export default Home;
