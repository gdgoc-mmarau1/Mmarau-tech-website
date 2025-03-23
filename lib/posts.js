import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      description: data.description,
      content,
    };
  });
}
