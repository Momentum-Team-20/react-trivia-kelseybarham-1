//This is the component that shows the quiz questions and answers. This is what shows when you click a category.

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {shuffle} from "lodash";
const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });


const QuizPage = ({ 
    categoryID, 
}) => { 
    const [questions, setQuestions] = useState([])

    const isQuestionEmpty = questions.length === 0;

    const [questionObjectIndex, setQuestionObjectIndex] = useState(0);

    const handleNextQuestion = () => {
        if (selectedAnswer === props.data[questionObjectIndex].correct_answer) {
            console.log(co)
        }
    }


    const advanceQuestion = () => {
        setQuestionObjectIndex(
        questionObjectIndex === questions.length - 1
        ? questionObjectIndex
        : questionObjectIndex + 1
    );
    }


    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
            .then((res) => setQuestions(res.data.results))
    }, [])

    return (
        <div>
            <div className="quiz-page">
                {questions.map((quiz) => (
                    <Quiz 
                        key={quiz.id}
                        question={quiz.question}
                        correctAnswer={quiz.correct_answer}
                        incorrectAnswers={quiz.incorrect_answers}
                    />
                ))}
            </div>
        </div>
    )
}

function Quiz({question,correctAnswer,incorrectAnswers}) {

    //let answers creates the box for answers and the ... spreads the incorrect answers so they can be in an array with the correct answer. It's copying what's in the incorrect answer array into a new array called answers and also including the correct answer as the last element.
    let answers = [...incorrectAnswers, correctAnswer];
    answers = shuffle(answers)
    const selectedAnswer = (value) => {
        //handle the clicking of answers in here
        if(value === correctAnswer) {
            window.alert('YOU GOT IT RIGHT')
        } else {
        window.alert('Wrongo')
        }
    }

    return (
        <div>
            <h2>{renderHTML(question)}</h2>
            <ul> 
            {answers.map((answer,idx)=>{ 
                   return <li onClick={()=> selectedAnswer(answer)} key={idx}><p >{answer}</p></li>
            })
            }
            </ul>
        </div>
    )
}



export default QuizPage