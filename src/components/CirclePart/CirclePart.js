import React from 'react';
import './CirclePart.css';

class CirclePart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.completedPart >= 1) {
            return <circle cx={this.props.center.x}
                           cy={this.props.center.y}
                           r={this.props.radius}
                           fill={this.props.fill}></circle>
        }
        return <path d={this.getPath()} fill={this.props.fill}></path>;
    }

    getPath() {
        let startPoint = this.getStartPoint();
        let endPoint = this.getEndPoint();
        let arcFlag = this.getArcFlag();
        return 'M' + this.sepeeaByComma(startPoint) + ' A' + this.props.radius + ',' + this.props.radius +
            ' 0 ' + arcFlag + ',1 ' + this.sepeeaByComma(endPoint) + ' L' + this.sepeeaByComma(this.props.center) + ' Z';
    }

    getStartPoint() {
        let x = this.props.center.x;
        let y = this.props.center.y - this.props.radius;
        return {x: x, y: y};
    }

    getEndPoint() {
        let completedAngle = this.props.completedPart * 2 * Math.PI;
        let x = this.props.center.x + (Math.sin(completedAngle) * this.props.radius);
        let y = this.props.center.y - (Math.cos(completedAngle) * this.props.radius);
        return {x: x, y: y};
    }

    getArcFlag() {
        return this.props.completedPart > 0.5 ? 1 : 0;
    }

    sepeeaByComma(point) {
        return point.x + ',' + point.y;
    }
}

export default CirclePart;
