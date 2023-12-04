import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((res) => {setCategoryList(res.data.trivia_categories)
      console.log(res.data)})
  }, [])

  console.log('render runs')
  return (
    <div>
      <h1>React Trivia Game</h1>
      <div className="category-list">
        {categoryList.map((category) => (
          <Category 
            key={category.id}
            name={category.name}
          />
        ))}
      </div>
    </div>
  )
}

function Category({name}) {

  return (
    <div>
      <div>{name}</div>
    </div>
  )
}

export default App
