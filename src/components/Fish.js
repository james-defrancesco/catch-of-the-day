import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {

  render() {
    {/* Data massaging */}
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';

    return(
      <li className="menu-fish">
        {/* If you are setting an att of a tag to something that is a
          variable, you do not need quotes (below) */}
        <img src={details.image} alt={details.name} />
      <h3 className="fish-name">
        {details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
    <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>

    </li>

    )

  }

}

Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired
}


export default Fish;
