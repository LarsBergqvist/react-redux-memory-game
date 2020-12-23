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
        const imPath = `${window.location.href}/images/${this.props.image}.jpg`;
        const backPath = `${window.location.href}/images/back.jpg`;

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
            <div className="flip-card-inner">
              <div className="flip-card-front">
                  <img src={`${backPath}`} alt=''/>
              </div>
              <div className="flip-card-back">
                  <img src={`${imPath}`} alt='' />
              </div>
            </div>
          </div> 
        );
    };
};

export default CardView;
