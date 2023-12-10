//This is the component that shows the quiz questions and answers. This is what shows when you click a category.

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {shuffle} from "lodash";
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });


const CategoryPage = ({ 
    categoryID, 
    setSelectedCategoryID
}) => { 
    const [questions, setQuestions] = useState([])
    const [questionIndex , setQuestionIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [score , setScore] = useState(0)
    console.log(`In Category component, the score is: ${score}`)

    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
            .then((res) => {
                setLoading(false)
                setQuestions(res.data.results)})
    }, [categoryID])

    /**
     * const questions = [];
     * const setQuestions = ( updatedValue ) {
     *  questions = updatedValue 
     * }
     * 
     * const state = [question,setQuestions];
     * const [questions,setQuestions] = state;
     * 
     * const [questions, setQuestions] = useState([])
     * 
     * const quetionState = useState([]) <- returns an array
     * questionsState[0] //questions
     * questionState[1] //setQuestions 
     * 
     * questionState = [questions, setQuestions]
     * 
     * 
     */

    


    const nextQuestion = () => {
        setQuestionIndex(
        questionIndex === questions.length 
        ? questionIndex
        : questionIndex + 1
    );
    }

    const previousQuestion = () => {
        setQuestionIndex(
        questionIndex ===  0
        ? questionIndex
        : questionIndex - 1
    );
    }




    if (loading) {
        return <h1> Page loading ⏳</h1>
      }

    return (
        <div>
            <div className="quiz-page">
                <div className="display">{}</div>
                    {questionIndex < questions.length && <Question
                    nextQuestion={nextQuestion} 
                        question={questions[questionIndex].question}
                        correctAnswer={questions[questionIndex].correct_answer}
                        incorrectAnswers={questions[questionIndex].incorrect_answers}
                        setScore={setScore}
                        score={score}
                    />}
                    {
                        questionIndex === questions.length && <div><WinPage score={score} total={questions.length} setSelectedCategoryID={setSelectedCategoryID}/></div>
                    }
                    
            </div>
            {questionIndex > 0 && <button onClick={previousQuestion}>Previous Question</button>}{'\n'}
            {questionIndex <= questions.length -1 && <button onClick={nextQuestion}>Next Question</button>}

        </div>
    )
}

const WinPage = ({score,total, setSelectedCategoryID}) => {
     return (<div>
        <div>{`Here's your score: ${score}/${total}\n\n`}</div>
        {score / total >= .70 && <div>Congratulations! You win.</div>}
        {score / total < .70 && <div>Too bad! You lost this category.</div>}{'\n'}
        <button onClick={() => setSelectedCategoryID(null)}>Return Home</button>
    </div>);
};

function Question({question,correctAnswer,incorrectAnswers, setScore, score,nextQuestion}) {

    //let answers creates the box for answers and the ... spreads the incorrect answers so they can be in an array with the correct answer. It's copying what's in the incorrect answer array into a new array called answers and also including the correct answer as the last element.
    let answers = [...incorrectAnswers, correctAnswer];
    answers = shuffle(answers)


    const selectedAnswer = (value) => {
        //handle the clicking of answers in here
        if(value === correctAnswer) {
            let newScore = score + 1;
            setScore(newScore)
            window.alert(`YOU GOT IT RIGHT. Your Score is ${newScore}`) 
            nextQuestion();
        } else {
        window.alert('Wrongo')
        }
    }


    return (
        <div>
            <h2>{renderHTML(question)}</h2>
            <ul> 
            {answers.map((answer,idx)=>{ 
                    
                   return <li className='answer' onClick={()=> selectedAnswer(answer)} key={idx}><p >{`${idx + 1}) `}{renderHTML(answer)}</p></li>

            })
            }
            </ul>
        </div>
    )
}



export default CategoryPage