import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Pagination from './components/Pagination'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import './App.css'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage]=useState(1);
  const [postsPerPage, setPostsPerPage]=useState(10);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      )

      console.log(result.data)

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])
  const indexOfLastPost=currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost,indexOfLastPost);
 
  const paginate=pageNumber=>setCurrentPage(pageNumber);
  return (
    <div className='container'>
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={currentPosts} />
      <Pagination postsPerPage={postsPerPage} totalPosts={items.length} paginate={paginate}/>
    </div>
  )
}

export default App
