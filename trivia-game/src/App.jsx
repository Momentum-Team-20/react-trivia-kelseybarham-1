import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CategoryPage from './components/quiz-page'

function App() {
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategoryId, setSelectedCategoryID] = useState(null)



  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((res) => {
        setLoading(false)
        setCategoryList(res.data.trivia_categories)
      console.log(res.data)})
  }, [])

  if (loading) {
    return <h1> Page loading ⏳</h1>
  }

  console.log(`the chosen category is ${selectedCategoryId}`)

  return (
    <div>
      <div className='triviaGameBanner'><h1>🧠 React Trivia Game ⭐️</h1></div>
      <div className='welcomePage'>
        {selectedCategoryId === null && 
        <p>Welcome to React Trivia! Please choose a category below, and answer the following ten questions. You will be scored on how many you got right. Good luck!</p>}
      </div>
      <div className="category-list">
        {categoryList.map((category) => {
          return (
          <Category 
            key={category.id}
            myCategoryId={category.id}
            name={category.name}
            selectedCategoryId={selectedCategoryId}
            chooseThisCategory={()=> {
              //set the selected category id to my category id
              setSelectedCategoryID(category.id)
            }}
            setSelectedCategoryID={setSelectedCategoryID}
          />)
          })}
      </div>
    </div>
  )
}

function Category({name, myCategoryId, chooseThisCategory, selectedCategoryId, setSelectedCategoryID }) {


  /**
   * Is the selectedCategoryId the same as mycategoryId
   */
  const categoryIsSelected = myCategoryId === selectedCategoryId; 

  if(selectedCategoryId !== null && !categoryIsSelected) return null;

  const chooseCategory = () => {
    console.log(myCategoryId)
    console.log(`https://opentdb.com/api.php?amount=10&category=${myCategoryId}`);
    chooseThisCategory();
  }
  console.log(`my caregory is ${myCategoryId} - ${name} - selected category is ${selectedCategoryId}, - am i selected? ${categoryIsSelected}`)

  if (categoryIsSelected) {

   return (
       <CategoryPage 
        categoryID={myCategoryId}
        setSelectedCategoryID={setSelectedCategoryID} />
     )
  }

  return (
    <div onClick={chooseCategory}>
      <div className='listOfCategories'>{name}</div>
    </div>
  )
}

export default App
