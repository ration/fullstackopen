import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => <button onClick={props.click}>{props.text}</button>;


const Feedback = (props) => {
    return (
        <div>
            <h3>give feedback</h3>
            {props.buttons.map((value, idx) => <Button key={idx} text={value.text} click={() => props.click(idx)}/>)}
        </div>
    )
};


const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
};

const Statistics = (props) => {
    const total = props.stats.map(stat => stat.pressed).reduce((a, b) => a + b);
    const average = props.stats.map(stat => stat.pressed * stat.value).reduce((a, b) => a + b) / total;
    const positive = 100 * props.stats
        .filter(stat => stat.value > 0 && stat.pressed > 0)
        .map(stat => stat.pressed)
        .reduce((a, b) => a + b, 0);

    const hasPresses = total === 0;
    return (
        <div>
            <h2>statistics</h2>

            {hasPresses ?
                ("No feedback given") :
                <table>
                    <tbody>
                    {props.stats.map(stat => <Statistic key={stat.text} text={stat.text} value={stat.pressed}/>)}
                    <Statistic text="all" value={total}/>
                    <Statistic text="average" value={average}/>
                    <Statistic text="positive" value={positive / total}/>
                    </tbody>
                </table>
            }
        </div>
    )
};


const App = () => {
    const feedbackButtons = [{
        pressed: 0,
        text: "good",
        value: 1,
    }, {
        pressed: 0,
        text: "neutral",
        value: 0,
    }, {
        pressed: 0,
        text: "bad",
        value: -1,
    }];
    const [stats, setStats] = useState(feedbackButtons);
    const onClick = (id) => {
        setStats(buttons => {
                buttons[id].pressed += 1;
                return [...buttons];
            }
        );
    };

    return (
        <div>
            <Feedback buttons={feedbackButtons} click={onClick}/>
            <Statistics stats={stats}/>
        </div>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);