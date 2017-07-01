import React, { Component } from 'react';

class Test extends Component {
  constructor () {
    super()
    this.state = {
      b: 111
    }
  }
  render () {
    console.log(this.props.match.params.id)
    return (
      <div className="bb">
        test
      </div>
    );
  }
}

export default Test;
