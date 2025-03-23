import { getAllPosts } from "../../lib/posts";
import { useRouter } from "next/router";
import BlogLayout from "../../components/BlogLayout";
import ReactMarkdown from "react-markdown";
import { NextSeo } from "next-seo";


export default function BlogPost({ post }) {
  const router = useRouter();
  if (router.isFallback) return <p>Loading...</p>;

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description,
        }}
      />
    <BlogLayout>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
    </BlogLayout>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === params.slug);

  return {
    props: { post },
  };
}
