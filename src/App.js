import './App.css';
import React from 'react';
import Student from './Student';

// refactored into a class component.
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      studentList: [],
      givenStudentName: '',
      givenTag: '' // typecasting to string
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTagSearch = this.handleTagSearch.bind(this);
    this.filterCallback = this.filterCallback.bind(this);
    this.passStudentTagsToParent = this.passStudentTagsToParent.bind(this);
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
        let { students } = data;
        students.forEach(student => (student.tags = []))
        this.setState({ studentList: students })
      })
  }

  passStudentTagsToParent(tags, studentId) {
    let studentList = this.state.studentList;
    studentList[studentId].tags = tags
    this.setState({ studentList })
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ givenStudentName: e.target.value })
  }

  handleTagSearch(e) {
    e.preventDefault();
    this.setState({ givenTag: e.target.value })
  }

  filterCallback(givenStudentName, givenStudentTag) {
    return (student) => (
      (
        student.firstName.toLowerCase().includes(givenStudentName.toLowerCase()) ||
        student.lastName.toLowerCase().includes(givenStudentName.toLowerCase()) ||
        !givenStudentName
      )
      && // only results that include both the name and the tag should be shown
      (
        (
          student.tags &&
          student.tags.map(function (word) {
            return word.toLowerCase();
          }).join(' ').indexOf(givenStudentTag.toLowerCase()) !== -1
        )
        || !givenStudentTag
      )
    )
  }


  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <input className='searchInput'
            onChange={this.handleSearch}
            placeholder='Search by name'
            value={this.state.givenStudentName} />
          <input className='searchInput'
            onChange={this.handleTagSearch}
            placeholder='Search by tag'
            value={this.state.givenTag} />
          {
            this.state.studentList
              .filter(this.filterCallback(this.state.givenStudentName, this.state.givenTag))
              .map(
                (student, index) => (
                  <Student
                    passStudentTagsToParent={this.passStudentTagsToParent}
                    key={index}
                    studentId={index}
                    pic={student.pic}
                    firstName={student.firstName}
                    lastName={student.lastName}
                    email={student.email}
                    company={student.company}
                    skill={student.skill}
                    grades={student.grades}
                    tags={student.tags}
                  // sometimes we're not rendering the child component,
                  // so we have to pass it tags
                  />
                )
              )
          }

        </header>
      </div>
    );
  }
}

export default App;
