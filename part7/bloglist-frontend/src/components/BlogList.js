import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px 0;
`
const NavLink = styled(Link)`
  line-height: 25px;
  padding: 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <Container>
      {(blogs && blogs.length)
        ? blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <li key={blog.id}>
                <NavLink to={`/blogs/${blog.id}`}>{blog.title}</NavLink>
              </li>
            )
          })
        : 'nothing'}
    </Container>
  )
}

export default BlogList
