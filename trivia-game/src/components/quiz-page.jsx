import { useState, useEffect } from 'react'
import axios from 'axios'

const QuizPage = ({ 
    categoryID, 
}) => { 
    const [questions, setQuestions] = useState([])

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

    const answers = [...incorrectAnswers, correctAnswer];

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
            <h2>{question}</h2>
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