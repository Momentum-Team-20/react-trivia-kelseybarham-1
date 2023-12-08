//This is the component that shows the quiz questions and answers. This is what shows when you click a category.

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {shuffle} from "lodash";
const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });


const QuizPage = ({ 
    categoryID, 
}) => { 
    const [questions, setQuestions] = useState([])
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




    const [index , setIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [questionObjectIndex, setQuestionObjectIndex] = useState(0)
    const [score , setScore] = useState(0)

    const isQuestionEmpty = questions.length === 0;

    const handleNextQuestion = () => {
        if (selectedAnswer === props.data[questionObjectIndex].correct_answer) {
        console.log()
        }
    }


    const advanceQuestion = () => {
        setIndex(
        index === questions.length - 1
        ? index
        : index + 1
    );
    }

    const previousQuestion = () => {
        setIndex(
        index ===  0
        ? index
        : index - 1
    );
    }

    const recordAnswer = (event) => {
        const answer = event.target.value
        setChosenAnswer(answer)
        if(answer === quiz[index].correct_answer) {
            setScore(score + 1)
        }
    }


    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
            .then((res) => {
                setLoading(false)
                setQuestions(res.data.results)})
    }, [categoryID])


    if (loading) {
        return <h1> Page loading ⏳</h1>
      }

    return (
        <div>
            <div className="quiz-page">
                <div className="display">{}</div>
                    <Quiz 
                        key={questions[index].id}
                        question={questions[index].question}
                        correctAnswer={questions[index].correct_answer}
                        incorrectAnswers={questions[index].incorrect_answers}
                    />
            </div>
            {index > 0 && <button onClick={previousQuestion}>Previous Question</button>}
            {index <= questions.length -1 && <button onClick={advanceQuestion}>Next Question</button>}

        </div>
    )
}

function Quiz({question,correctAnswer,incorrectAnswers}) {

    //let answers creates the box for answers and the ... spreads the incorrect answers so they can be in an array with the correct answer. It's copying what's in the incorrect answer array into a new array called answers and also including the correct answer as the last element.
    let answers = [...incorrectAnswers, correctAnswer];
    answers = shuffle(answers)

    const [score , setScore] = useState(0)


    const selectedAnswer = (value) => {
        //handle the clicking of answers in here
        if(value === correctAnswer) {
            setScore(score + 1)
            window.alert(`YOU GOT IT RIGHT. Your Score is ${score}`)
        } else {
        window.alert('Wrongo')
        }
    }

    const allAnswers = [];
    // if (props.data.length > 0) {
    //     allAnswers.push();
    // }

    return (
        <div>
            <h2>{renderHTML(question)}</h2>
            <ul> 
            {answers.map((answer,idx)=>{ 
                   return <li onClick={()=> selectedAnswer(answer)} key={idx}><p >{answer}</p></li>

                   //create a next button?
            })
            }
            </ul>
        </div>
    )
}



export default QuizPage