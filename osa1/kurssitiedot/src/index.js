import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
};

const Part = (props) => {
    return (
        <>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </>
    )
};


const Content = (props) => {
    return (
        <div>
            {props.parts.map(value => <Part part={value} />)}
        </div>
    )
};

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.total}</p>
        </>
    )
};


const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ];

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts}/>
            <Total total={parts.map(f => f.exercises).reduce((a,b) => a+b)} />
        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));