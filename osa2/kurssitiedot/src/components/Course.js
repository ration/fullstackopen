import React from 'react'

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
            {props.parts.map(value => <Part key={value.name} part={value}/>)}
        </div>
    )
};

const Total = (props) => {
    return (
        <>
            <b>Total of {props.total} exercises</b>
        </>
    )
};

const Course = (props) => {
    return (
        <>
            <Header course={props.course.name}/>
            <Content parts={props.course.parts}/>
            <Total total={props.course.parts.map(f => f.exercises).reduce((a, b) => a + b)}/>
        </>
    )

};


export default Course