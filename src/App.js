import logo from './logo.svg';
import './App.css';
import React from 'react';
import Student from './Student';


// refactored into a class component.
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      studentList: [],
      givenInput: '', // typecasting
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.filterStudents = this.filterStudents.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      givenInput: e.target.value
    })
  }

  filterStudents(givenInput) {
    return (student) => (
      student.firstName.toLowerCase().includes(givenInput.toLowerCase()) ||
      student.lastName.toLowerCase().includes(givenInput.toLowerCase()) ||
      !givenInput
    )
  }

  componentDidMount() {
    /* If we were to do database stuff (although this assessment is
     * entirely front-end work), we'd need async if we were awaiting
     * API requests/responses from the database, and needed the rest of this
     * code block to run while the promise resolves. */

    const apiUrl = "https://api.hatchways.io/assessment/students";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ studentList: data.students })
      })
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <input type="text" onChange={this.handleSearch} placeholder='Search by name'
            value={this.state.givenInput} />
          {
            this.state.studentList
              .filter(this.filterStudents(this.state.givenInput))
              .map(
                student => (
                  <Student
                    pic={student.pic}
                    firstName={student.firstName}
                    lastName={student.lastName}
                    email={student.email}
                    company={student.company}
                    skill={student.skill}
                    grades={student.grades} />
                )
              )
          }

        </header>
      </div>
    );
  }
}

export default App;
