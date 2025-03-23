import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import BlogLayout from "../../components/BlogLayout";

export default function Blog({ posts }) {
  return (
    <BlogLayout>
      {posts.map((post) => (
        <div key={post.slug} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.date}</p>
          <p>{post.description}</p>
          <Link href={`/blog/${post.slug}`}>
            <span className="text-blue-500">Read More</span>
          </Link>
        </div>
      ))}
    </BlogLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}
