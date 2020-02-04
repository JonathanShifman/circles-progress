import React from 'react';
import './App.css';
import CirclePart from "../CirclePart/CirclePart";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        };

        this.radius = 250;
        this.padding = 20;
        this.colors = ['red', 'cornflowerblue', 'orange', 'black', 'gold', 'white'];
        this.circleMillis = (1/30) * 60 * 1000;
    }

    componentDidMount() {
        this.startTime = +new Date();
        setInterval(() => this.updateTimer(), 20);
    }

    render() {
        return <div id={'app-w'}>
            <svg id={'app-svg'}>
                { this.getCircleParts() }
            </svg>
        </div>;
    }

    getCircleParts() {
        let res = [];
        let center = this.padding + this.radius;
        for (let i = 0; i < this.colors.length; i++) {
            let color = this.colors[i];
            let circleRadius = (1 - (i / this.colors.length)) * this.radius;
            let millisSinceCircleStart = this.state.timer - (i * this.circleMillis);
            if (millisSinceCircleStart < 0) {
                break;
            }
            let completedPart = Math.min(1, millisSinceCircleStart / this.circleMillis);
            res.push(
                <CirclePart key={i}
                            center={{x: center, y: center}}
                            radius={circleRadius}
                            completedPart={completedPart}
                            fill={color} />
            )
        }
        return res;
    }

    updateTimer() {
        let currentTime = +new Date();
        this.setState({timer: currentTime - this.startTime});
    }
}

export default App;
