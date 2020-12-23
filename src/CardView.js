import React, { Component } from 'react';
import './Game.css';

class CardView extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!this.props.matched && !this.props.imageUp) {
            this.setState({fade: true});
            this.props.onClick(this.props.id);
        }
    }

    render() {
        const imPath = `./images/${this.props.image}.jpg`;
        const backPath = './images/back.jpg';

        let className = 'Card flip-card';
        if (this.props.matched) {
            className = className + ' Matched';
        }
        const classNameWithFade = className + ' animate';

        return (
            <div
                onClick={this.onClick}
                className={this.props.imageUp ? classNameWithFade: className} 
            >
            <div class="flip-card-inner">
              <div class="flip-card-front">
                  <img src={`${backPath}`} alt=''/>
              </div>
              <div class="flip-card-back">
                  <img src={`${imPath}`} alt='' />
              </div>
            </div>
          </div> 
        );
    };
};

export default CardView;
