import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import firebase from 'firebase';

class App extends React.Component {

  constructor() {
    //cannot use "this" until you call "super"
    super();
    // this.addFish = this.addFish.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    // this.addToOrder = this.addToOrder.bind(this);
    // this.updateFish = this.updateFish.bind(this);
    // this.removeFish = this.removeFish.bind(this);
    // this.removeFromOrder = this.removeFromOrder.bind(this);

  }
//get initial state
  state = {
    fishes: {},
    order: {}
  };

  //specifically comes from react - method must be this
  componentWillMount() {
    //this runs right before <app> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
    //check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      //update app component's order setState
      this.setState({order: JSON.parse(localStorageRef)});
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addToOrder = (key) => {
    //take a copy of our state
    const order = {
      ...this.state.order
    };
    //update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    //update our state
    this.setState({order});
  };

  removeFromOrder = (key) => {
    //copy of the state below
    const order = {
      ...this.state.order
    };
    delete order[key];
    this.setState({order});
  };

  addFish = (fish) => {
    //update our state
    const fishes = {
      ...this.state.fishes
    }; //existing state "..." = copy of state
    //add in our new fish and timestamp
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //set state
    this.setState({fishes})
  };

  updateFish = (key, updatedFish) => {
    const fishes = {
      ...this.state.fishes
    };
    fishes[key] = updatedFish;
    this.setState({fishes});
  };

  removeFish = (key) => {
    const fishes = {
      ...this.state.fishes
    };
    fishes[key] = null;
    this.setState({fishes});

  };

  loadSamples = () => {
    this.setState({fishes: sampleFishes});
  };

  render() {
    return (<div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market"/>
        <ul className="list-of-fishes">
          {/*.keys returns the property names of the objects in question
            If you want to loop over something you need an array (below)
            .map loops over something, takes in something and returns somethign else
            */
          }
          {
            Object.keys(this.state.fishes)
            //index is for you, key is for react. You cant pass KEY so I set
            //it to "index"
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
          }
        </ul>
      </div>
      <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder}/>

      <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish} removeFish={this.removeFish} storeId={this.props.params.storeId}/>

    </div>)
  }

}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
