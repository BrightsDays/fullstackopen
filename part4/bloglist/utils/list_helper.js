const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((prev, blog) => prev + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes =  Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.filter(blog => blog.likes === maxLikes)

  return {
    title: favorite[0].title,
    author: favorite[0].author,
    likes: favorite[0].likes
  }
}

const mostBlogs = (blogs) => {
  let authors = []

  blogs.forEach(blog => {
    if (authors.find(({ author }) => author === blog.author)) {
      authors.find(({ author }) => author === blog.author).blogs += 1
    } else {
      authors.push({
        author: blog.author,
        blogs: 1
      })
    }
  })

  const maxBlogs = Math.max(...authors.map(author => author.blogs))
  return authors.find(author => author.blogs === maxBlogs)
}

const mostLikes = (blogs) => {
  let authors = []

  blogs.forEach(blog => {
    if (authors.find(({ author }) => author === blog.author)) {
      authors.find(({ author }) => author === blog.author).likes += blog.likes
    } else {
      authors.push({
        author: blog.author,
        likes: blog.likes
      })
    }
  })

  const maxLikes = Math.max(...authors.map(author => author.likes))
  return authors.find(author => author.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}