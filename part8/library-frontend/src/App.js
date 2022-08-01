import Authors from './components/Authors'
import { Routes, Route, Link } from 'react-router-dom'
import Books from './components/Books'

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/authors">Authors</Link>
        <Link to="/books">Books</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h3>Main</h3>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </div>
  )
}

export default App
