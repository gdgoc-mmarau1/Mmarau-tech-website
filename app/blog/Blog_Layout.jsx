const BlogLayout = ({ children }) => {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">My Blog</h1>
        {children}
      </div>
    );
  };
  
  export default BlogLayout;
  