import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.slice(0, 10).map(post => (
        <div key={post.id} className="border p-4 rounded bg-white shadow">
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
