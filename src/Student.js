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
        <div id='studentImageWrapper'>
          <img src={this.props.pic} />
          <div id='studentNameAndDescription'>
            <div id='nameStyle'>
              {this.props.firstName + " " + this.props.lastName}
            </div>

            <div id='studentDescription'>
              <div>
                {"Email: " + this.props.email}
              </div>
              <div>
                {"Company: " + this.props.company}
              </div>
              <div>
                {"Skill: " + this.props.skill}
              </div>
              <div>
                {"Average: " + this.takeAverage(this.props.grades) + "%"}
              </div>

            </div>

          </div>

        </div>
        <div id="studentUnderscore" />
      </div>

    );
  }
}

export default Student;
