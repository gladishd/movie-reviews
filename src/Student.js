import './App.css';
import React from 'react';

// refactored into a class component.
class Student extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.takeAverage = this.takeAverage.bind(this)
  }

  takeAverage = (grades) => {
    let average = 0;
    for (let n of grades) { average += Number(n); }
    return (average / grades.length);
  }

  render() {
    return (
      <div>
        <img src={this.props.pic} />
        {this.props.firstName + " " + this.props.lastName}
        {"Email: " + this.props.email}
        {"Company: " + this.props.company}
        {"Skill: " + this.props.skill}
        {"Average: " + this.takeAverage(this.props.grades) + "%"}
      </div>
    );
  }
}

export default Student;
