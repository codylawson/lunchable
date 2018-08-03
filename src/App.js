import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [
        {
          "name": "Jimmy John's",
          "estMinutes": 45,
          "blackList": ["@will"],
          "visits": [
            {
              "date": new Date().getTime() - (1*24*60*60*60*1000),
              "people": ["@will", "@cody"]
            }, {
              "date":  new Date().getTime() - (7*24*60*60*60*1000),
              "people": ["@josh", "@will", "@slibby"]
            }
          ]
        }, {
          "name": "Big Dog's",
          "estMinutes": 45,
          "blackList": ["@cody"],
          "visits": [
            {
              "date":  new Date().getTime() - (2*24*60*60*60*1000),
              "people": ["@josh", "@slibby", "@will"]
            }, {
              "date":  new Date().getTime() - (9*24*60*60*60*1000),
              "people": ["@josh"]
            }
          ]
        }, {
          "name": "Airport",
          "estMinutes": 60,
          "blackList": ["@slibby"],
          "visits": [
            {
              "date":  new Date().getTime() - (3*24*60*60*60*1000),
              "people": ["@cody", "@josh"]
            }, {
              "date":  new Date().getTime() - (8*24*60*60*60*1000),
              "people": ["@cody", "@josh"]
            }, {
              "date":  new Date().getTime() - (12*24*60*60*60*1000),
              "people": ["@josh"]
            }
          ]
        }, {
          "name": "Qdoba",
          "estMinutes": 45,
          "blackList": [],
          "visits": [
            {
              "date":  new Date().getTime() - (4*24*60*60*60*1000),
              "people": ["@cody", "@josh", "@garyknoll"]
            }, {
              "date":  new Date().getTime() - (11*24*60*60*60*1000),
              "people": ["@will", "@josh"]
            }
          ]
        }, {
          "name": "Food Court",
          "estMinutes": 60,
          "blackList": ["@garyknoll"],
          "visits": [
            {
              "date":  new Date().getTime() - (5*24*60*60*60*1000),
              "people": ["@cody", "@josh"]
            }, {
              "date":  new Date().getTime() - (13*24*60*60*60*1000),
              "people": ["@cody", "@josh"]
            }
          ]
        }
      ]
    };
  }

  getRestaurants = (peopleGoing) => {
    //get rid of blacklisted restaurants for all the people that are going
    let restaurants = this.state.restaurants.filter(restaurant => {
      return !peopleGoing.some(p => restaurant.blackList.includes(p))
    });

    //sort the restaurants by visit date, oldest to most recent
    return restaurants.sort((restaurantA, restaurantB) => {
      //filter out the visits where nobody going was on the visit
      const restaurantAVisits = restaurantA.visits.filter(visit => {
        return peopleGoing.some(p => visit.people.includes(p))
      });
      const restaurantBVisits = restaurantB.visits.filter(visit => {
        return peopleGoing.some(p => visit.people.includes(p))
      });

      return restaurantAVisits[0].date - restaurantBVisits[0].date;
    })
  }

  addVisit = (locationName, people) => {
    const restaurants = this.state.restaurants;
    restaurants.some(restaurant => {
      if (restaurant.name === locationName) {
        restaurant.visits.unshift({
          date: new Date(),
          people
        });

        this.setState({restaurants});
        return true;
      }
    })
  }

  render() {
    console.log(this.getRestaurants(["@cody", "@josh", "@garyknoll"]));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
