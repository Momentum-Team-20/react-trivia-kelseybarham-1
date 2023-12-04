import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function QuizPage() {
    const [quizPage, setQuizPage] = useState([])

    useEffect(() => {
        axios
            .get('https://opentdb.com/api.php?amount=10')
            .then((res) => setQuizPage(res.data.results))
    }, [])

    return (
        <div>
            <div className="quiz-page">
                {quizPage.map((quiz)) => (
                    <Quiz 
                        key={quiz.id}
                        question={quiz.question}
                        correctAnswer={quiz.correct_answer}
                        incorrectAnswers={quiz.incorrect_answers}
                    />
                )}
            </div>
        </div>
    )
}

function Quiz(props) {

    return (
        <div>
            <h2>{props.question}</h2>
            <ul> 
            <li><p>{props.correctAnswer}</p></li>
            <li><p>{props.incorrectAnswers}</p></li>
            </ul>
        </div>
    )
}

export default QuizPage