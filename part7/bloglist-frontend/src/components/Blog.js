import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import { initBlogs } from '../reducers/blogReducer'
import { deleteBlog, addLike } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 5px 0;
  padding: 5px;
`
const Flex = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  align-items: baseline;
`
const Title = styled.h3`
  font-size: 20px;
  margin: 5px 0;
`
const Paragraph = styled.p`
  margin: 0 0 5px 0;
`
const Button = styled.button`
  width: fit-content;
  display: block;
  padding: 5px 30px;
  font-size: 16px;
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`

const BlogPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const clickHandler = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(showNotification(`${blog.title} deleted`, 'info'))
  }

  const comments = blog
    ? blog.comments.map((comment, id) => {
      return <li key={`cmt_${id}`}>{comment}</li>
    })
    : null

  if (blog) return (
    <Container>
      <Title>{blog.title} - {blog.author}</Title>
      <Paragraph><b>URL:</b> {blog.url}</Paragraph>

      <Flex>
        <Paragraph><b>likes:</b> {blog.likes}</Paragraph>
        <Button
          className='button--like'
          onClick={() => dispatch(addLike(blog))}>like</Button>
      </Flex>

      <Paragraph>Added by {blog.user.username}</Paragraph>
      {user.username === blog.user.username &&
        <Button onClick={() => clickHandler()}>delete</Button>}

      <Title>Comments</Title>
      {comments}
      <CommentForm blog={blog} />
    </Container>
  )
}

export default BlogPage