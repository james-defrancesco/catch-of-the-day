import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  //constructor with super() allows you to bind your method outside of "render" to
  //the main class using this syntax // One way to do it, 2nd way is below on the
  //onSubmit function.

    //constructor(){
      //super();
      //this.goToStore = this.goToStore.bind(this);
    //}

    goToStore(event) {
      event.preventDefault();
      console.log(`You changed the url`);
      //first, grab text from box
      const storeId = this.storeInput.value;
      console.log(`Going to ${storeId}`);
      //second, transition from / to /store/:storeId
      this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
      return (
        //second way to do the bind method from above. Instead of the constructor.
        <form className="store-selector" onSubmit={this.goToStore.bind(this)}>

          {/* hello this is a comment in react // comments can never be in the
            top level because "Return" only returns one item. In this case,
            "form" is being returned, so I put the comment under that. */}

          <h2>Please Enter A Store</h2>
          <input type="text" required placeholder="Store Name"
            defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
          <button type="submit">Visit Store -> </button>

        </form>
      )
    }
}
//surface the router from the parent with contextTypes
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
