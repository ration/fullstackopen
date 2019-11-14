import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const pick = () => Math.floor(Math.random() * anecdotes.length);


const Anecdote = (props) => {
    return (
        <div>
            {props.anecdote}
            <div>
                has {props.votes} votes
            </div>
        </div>)
}

const App = (props) => {

    const votesArr = Array(anecdotes.length).fill(0);

    const [votes, setVotes] = useState(votesArr);

    const [selected, setSelected] = useState(pick());

    const vote = (id) => {
        setVotes(prev => {
            prev[id] += 1;
            return [...prev];
        });
    };


    const change = () => {
        setSelected(prev => {
            if (anecdotes.length < 2) {
                return prev;
            }
            let next = pick();
            while (next === prev) {
                next = pick();
            }
            return next;
        });
    };


    return (
        <div>
            <div>
                <h2>Anecdote of the day</h2>
                <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
                <div>
                    <button onClick={() => vote(selected)}>vote</button>
                    <button onClick={() => change()}>next anecdote</button>
                </div>
            </div>
            <div>
                <h2>Anecdote with the most votes</h2>
                <Anecdote anecdote={props.anecdotes[votes.indexOf(Math.max(...votes))]} votes={votes[votes.indexOf(Math.max(...votes))]} />
            </div>
        </div>
    )
};


ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
);