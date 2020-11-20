import './App.css';
import React from 'react';

// refactored into a class component.
class Student extends React.Component {
  constructor() {
    super()
    this.state = {
      showAllTags: false,
      newTags: '',
      tagsForStudent: []
    }
    this.takeAverage = this.takeAverage.bind(this)
    this.toggleListView = this.toggleListView.bind(this)
    this.postNewTag = this.postNewTag.bind(this)
    this.putTags = this.putTags.bind(this)
    this.postTags = this.postTags.bind(this)
  }

  componentDidMount() {
    /* Each time I re-render the child component,
     * such as when the search box is cleared,
     * I want to fetch the original tags. */
    this.setState({ tagsForStudent: this.props.tags })
  }

  toggleListView = () => {
    this.setState({
      showAllTags: !this.state.showAllTags,
    })
  }

  postNewTag = (value) => {
    if (value === ' ') {
      return;
    }
    this.setState({
      newTags: value,
    })
  }

  putTags = (tag) => {
    if (tag[tag.length - 1] === ' ') {
      tag = tag.trim();
      if (!(this.state.tagsForStudent.includes(tag))) {
        let tags = [...this.state.tagsForStudent, tag];
        this.postTags(tags);
      }
      this.postNewTag('');
    }
  }

  postTags = (updatedTags) => {
    this.setState({
      tagsForStudent: updatedTags
    });
    this.props.passStudentTagsToParent(updatedTags, this.props.studentId);
  }

  takeAverage = (grades) => {
    let average = 0;
    for (let n of grades) { average += Number(n); }
    return (average / grades.length);
  }

  render() {
    return (
      <div>
        <div id='studentButtonWrapper'>
          <div id='studentImageWrapper'>
            <img src={this.props.pic} alt='' />
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
              {this.state.showAllTags &&
                <div>
                  {this.props.grades.map((score, i) => { return <div key={i} id='testScores'>Test {i}: &nbsp; &nbsp; {score}%</div> })}
                  <div className='allTagsDiv'>
                    {this.state.tagsForStudent && this.state.tagsForStudent.map((tag, index) => <div className='studentTag' key={index}>{tag}</div>)}
                  </div>
                  <div onKeyUp={e => this.putTags(e.target.value)}>
                    <input value={this.state.newTags}
                      className='inputNewTagsText'
                      onChange={e => { this.postNewTag(e.target.value); }}
                      placeholder='Add a tag' />
                  </div>
                </div>
              }
            </div>
          </div>
          <div>
            {this.state.showAllTags ? <button className='toggleExpansion' onClick={this.toggleListView}>-</button> : <button className='toggleExpansion' onClick={this.toggleListView}>+</button>}
          </div>
        </div>
        <div id="studentUnderscore" />
      </div>
    );
  }
}

export default Student;
