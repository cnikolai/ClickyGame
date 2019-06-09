import React from 'react';
//import logo from './logo.svg';
//import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FriendCard from "./FriendCard/FriendCard";
import Wrapper from "./Wrapper";
import friends from "./friends.json";
//import './App.css';

// const styles ={
//   btn: {
//     backgroundColor: '#F16E10'
//   },
//   header: {

//   }
// };

// const styles ={
//   usertext: {
//     color: '#E60000'
//   }
// };

class App extends React.Component {
  state = {
    friends,
    userscore: 0,
    topscore: 0,
    imagesclicked: [], //the id of the images already clicked
    usertext: "Click on an image to begin!",
    usertextcolor: {
      color: '#000000'
    }
  };

  handleClick = (id) => {
    this.randomize();
    var inArray = false;
    console.log("image clicked");
    console.log(`image ${id} clicked`);
    //check to see if the image has already been clicked
    //if image is in the array
    for (var i = 0; i < this.state.imagesclicked.length; i++) {
      if (this.state.imagesclicked[i] === id) {
        console.log(`image ${id} has already been clicked`);
        inArray = true;
        break;
      }
    }
    if (!inArray) {
      //add it to the array
      this.state.imagesclicked.push(id);
      this.setState({imagesclicked: this.state.imagesclicked, userscore: this.state.userscore + 1, usertext: "You Guessed Correctly!", usertextcolor: {color: "#E6E600"}});
    }
    else {
      //you lose, reset score to 0, new randomize
      //TODO: output you lose
      this.setState({usertext: "You Guessed Incorrectly!", usertextcolor: {color: "#E60000"}});
      this.resetGame();
      this.checkTopScore(); 
      //TODO: randomize
    }
    //check to see if you score is the top score
    //if it is, increment top score
  };

  checkTopScore () {
    if (this.state.userscore > this.state.topscore) {
      this.setState({topscore: this.state.userscore});
    }
  };

  resetGame () {
    this.setState({userscore: 0,imagesclicked: [], usertext: "You guessed incorrectly!", usertextcolor: {color: "#000000"}});
    this.randomize();
    //this.refs.usertext.innerHTML = "You Lose!";
    //this.refs.usertext.innerHTML = "Click on an image to begin!";
  };

  shuffle (array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
	return array;
  };

  randomize () {
    this.setState ({
      friends: this.shuffle(this.state.friends)
    });
  };

  // handleHomeClick () {
  //   this.resetGame();
  // }

  componentDidMount() {
    this.randomize();
    //setTimeout(this.show(),1000);

  };

  componentDidUpdate (prevProp, prevState) {
    //this.refs.usertext.innerHTML = "You Lose!";
    //setTimeout(this.show(),1000);
  };

  componentWillMount () {
    //setTimeout(this.show(),1000);
  };
  
  show() {
    this.setState({usertext: "Click on an image to begin!", usertextcolor: {color: "#000000"}});
  };

  //TODO: when click on home button, restart the game (reset all the scores and randomize the images)
  //TODO: randomize images

  render () {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="/"><h1>Clicky Game</h1></a>
      <div className="navbar-text text-center text-dark"><h3 style={this.state.usertextcolor}>{this.state.usertext}</h3></div>
      <div className="navbar-text text-light"><h3>Your Score: {this.state.userscore} | Top Score: {this.state.topscore}</h3>
      </div>
    </nav>
    {/* <Navbar bg="primary" variant="dark" color="indigo">
    <Navbar.Brand href="/"><h1>Clicky Game</h1></Navbar.Brand>
    <Nav className="mr-auto">
    </Nav>
    <Navbar.Text className="text-center" bg="primary" variant="dark">
      <h3>Click on an image to begin</h3>
    </Navbar.Text>
    <Navbar.Text bg="primary" variant="dark" color="white">
      <h2>Your Score: | Top Score: </h2>
    </Navbar.Text>
  </Navbar> */}
  <Wrapper>
      {this.state.friends.map(friend => <FriendCard key={friend.id} name={friend.name} id={friend.id}
        image={friend.image}
        occupation={friend.occupation}
        location={friend.location} removeCard={this.removeCard} handleClick={() => {this.handleClick(friend.id)}}/>)}
        {/* {this.state.friends.filter(myfriend => myfriend.id <= 4).map(friend => <FriendCard key={friend.id} name={friend.name} id={friend.id}
        image={friend.image}
        occupation={friend.occupation}
        location={friend.location} removeCard={this.removeCard} handleClick={() => {this.handleClick(friend.id)}}/>)}
        {this.state.friends.filter(myfriend => myfriend.id >4 && myfriend.id <= 8).map(friend => <FriendCard key={friend.id} name={friend.name} id={friend.id}
        image={friend.image}
        occupation={friend.occupation}
        location={friend.location} removeCard={this.removeCard} handleClick={() => {this.handleClick(friend.id)}}/>)}
        {this.state.friends.filter(myfriend => myfriend.id >8 && myfriend.id <= 12).map(friend => <FriendCard key={friend.id} name={friend.name} id={friend.id}
        image={friend.image}
        occupation={friend.occupation}
        location={friend.location} removeCard={this.removeCard} handleClick={() => {this.handleClick(friend.id)}}/>)} */}
    </Wrapper>
  {/* <Button bsStyle="" style={styles.btn} bsSize="large" >Something</Button> */}
  </div>
  );
      }
}

export default App;
