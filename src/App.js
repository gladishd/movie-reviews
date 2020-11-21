import './App.css';
import React from 'react';
import Item from './Item';

let dataObject = {
  "students": [
    {
      "producer": "Steve McQueen",
      "topic": "Steve McQueen's powerful anthology consists of five films, each telling a different story about the experiences of Black men and women in London's West Indian community.",
      "firstName": "Small",
      "ratings": [
        '78', '69', '87', '90', '78', '90', '78', '90'
      ],
      "id": "1",
      "lastName": "Axe",
      "pic": "https://media.npr.org/assets/img/2020/11/20/km_small_axe_03072019_003_wide-18c574e02779acfc08607d6b95d03ed67a96e6d0-s1600-c85.jpg",
      "premiered": "15 November 2020",
      "tags": ['anthology']
    },

    {
      "producer": "Atomic Cartoons",
      "topic": "The LEGO Star Wars Holiday Special brings back computer animated, extruded-plastic versions of Rey, Finn, Poe, Chewie, Rose, Lando and the droids.",
      "firstName": "The LEGO Star Wars",
      "ratings": [
        '89', '76', '89', '67', '67', '89', '96', '78'
      ],
      "id": "2",
      "lastName": "Holiday Special",
      "pic": "https://media.npr.org/assets/img/2020/11/16/lego_star_wars_holiday_special_1_740ec75a_wide-94b396025e9cc9674e81541397d6f64ba9e9a7e7-s1600-c85.jpeg",
      "premiered": "17 November 2020",
      "tags": ['star wars']
    },

    {
      "producer": "Francis Lee",
      "topic": "Ammonite, and it feels like a step up in scale and ambition, partly because it's about real-life figures, and partly because it stars Kate Winslet and Saoirse Ronan.",
      "firstName": "Ammonite",
      "ratings": [
        '98', '76', '67', '89', '67', '98', '67', '98', '86'
      ],
      "id": "3",
      "lastName": "",
      "pic": "https://media.npr.org/assets/img/2020/11/12/ammonite_wide-648f11c6be7c645b474ffa5a5d807bc71623f8ab-s700-c85.jpg",
      "premiered": "13 November 2020",
      "tags": ['scale', 'ambition']
    },

    {
      "producer": "Sacha Baron Cohen",
      "topic": "It starred Cohen as a fictional reporter from Kazakhstan who journeys across the U.S. and interacts with Americans who don't know they're part of a comedy.",
      "firstName": "Borat",
      "ratings": [
        '90', '78', '79', '58', '36', '49', '96', '78'
      ],
      "id": "5",
      "lastName": "2",
      "pic": "https://media.npr.org/assets/img/2020/10/23/borat-subsequent-moviefilm-borat_subsequent_moviefilm_unit_00114r_rgb_wide-6246f5acfd1f8a1a3769b4dfcdcce31204e4e219-s700-c85.jpg",
      "premiered": "23 October 2020",
      "tags": ['journeys']
    },

    {
      "producer": "Frederick Wiseman",
      "topic": "City Hall is one of the few films Wiseman has shot in his hometown, Boston, not that you'd necessarily know about that connection from the film.",
      "firstName": "City",
      "ratings": [
        '98', '75', '69', '85', '79', '60', '98', '67'
      ],
      "id": "4",
      "lastName": "Hall",
      "pic": "https://media.npr.org/assets/img/2020/10/29/violent-crime-mtg-mayor_wide-579618ce3c2d823641d2b7801c91cd8cc3e17909-s1600-c85.jpg",
      "premiered": "8 September 2020",
      "tags": ['public servants']
    },

    {
      "producer": "Microsoft",
      "topic": "TypeScript is an open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions.",
      "firstName": "TypeScript",
      "ratings": [
        '98', '76', '98', '76', '89', '68', '10', '67', '97'
      ],
      "id": "6",
      "lastName": "",
      "pic": "https://everyday.codes/wp-content/uploads/2020/02/ts.png",
      "premiered": "1 October 2012",
      "tags": ['open-source', "despite its name, TypeScript doesn't have proper type validation"]
    },

    {
      "producer": "Nicolas Roeg",
      "topic": "It's an adaptation of the 1983 Roald Dahl book about a kid and his grandmother who get caught up in the dastardly plans of a group of child-hating witches at a seaside hotel. ",
      "firstName": "The",
      "ratings": [
        '94', '56', '87', '90', '65', '85', '79', '98'
      ],
      "id": "6",
      "lastName": "Witches",
      "pic": "https://media.npr.org/assets/img/2020/10/23/the-witches_0_danidel-smith_warner_hbo_wide-9444f40ab7c1c2a2907debe7b23a7170be0fff10-s1600-c85.jpg",
      "premiered": "22 October 2020",
      "tags": ['adaptation']
    },





  ]
}
// 20201121000446
// https://api.hatchways.io/assessment/students

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

    // const apiUrl = "https://api.hatchways.io/assessment/students";

    // fetch(apiUrl)
    //   .then(response => response.json())
    //   .then(data => {
    //     let { students } = data;
    //     students.forEach(student => (student.tags = []))
    //     this.setState({ studentList: students })
    //   })

    this.setState({
      studentList: dataObject.students
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
                  <Item
                    passStudentTagsToParent={this.passStudentTagsToParent}
                    key={index}
                    studentId={index}
                    pic={student.pic}
                    firstName={student.firstName}
                    lastName={student.lastName}
                    email={student.topic}
                    company={student.producer}
                    skill={student.premiered}
                    grades={student.ratings}
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
