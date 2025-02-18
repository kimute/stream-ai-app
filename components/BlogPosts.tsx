import { use } from "react"

async function fetchBlogPosts() {
  // Simulate a delay to demonstrate streaming
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return [
    { id: 1, title: "Introduction to Streaming in Next.js", content: "Streaming allows you to break..." },
    { id: 2, title: "Building Responsive UIs with React", content: "React's component-based architecture..." },
    { id: 3, title: "The Power of Server Components", content: "Server Components in React allow you to..." },
  ]
}

export default function BlogPosts() {
  const posts = use(fetchBlogPosts())

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
        </article>
      ))}
    </div>
  )
}

