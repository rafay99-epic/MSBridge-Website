import Container from "@/app/_components/container";
import { PostTitle } from "@/app/_components/post-title";
import { getAllPosts } from "@/lib/api";
import PostsListClient from "./PostsListClient";

export const metadata = {
  title: "Posts - MS Bridge",
  description: "Browse and search all blog posts on MS Bridge.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Container>
        <article className="mb-24">
          <PostTitle>All Posts</PostTitle>
          <p className="max-w-2xl text-neutral-600 dark:text-slate-300 leading-7 mb-6">
            Search and explore our latest articles.
          </p>
          <PostsListClient posts={posts} />
        </article>
      </Container>
    </main>
  );
}


