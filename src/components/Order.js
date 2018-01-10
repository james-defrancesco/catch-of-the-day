import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {

//constructor necessary when you want to access "this" inside of a method
//bind it using constructor
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    //button stored JSX to use as a variable
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>
      &times;</button>

    if(!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer
      available! {removeButton}</li>
    }
    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500} >
            {/*key of two elements beside each othern eed unique key*/}
          <span key={count}>{count}</span>
        </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
        </span>
      <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';

        if(isAvailable) {
          return prevTotal + (count * fish.price || 0)
        }
        return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
      <CSSTransitionGroup
        className="order"
        component="ul"
        transitionName="order"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {orderIds.map(this.renderOrder)}
        <li className="total">
          <strong>Total:</strong>
        </li>
      </CSSTransitionGroup>
      {formatPrice(total)}
      </div>
    )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;
