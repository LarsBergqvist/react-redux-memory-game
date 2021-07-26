import React from 'react';
import PropTypes from 'prop-types';
import './Game.css';

const CardView = props => {
    const imPath = `${window.location.href}/images/${props.image}.jpg`;
    const backPath = `${window.location.href}/images/back.jpg`;

    let className = 'card flip-card';
    if (props.matched) {
        className = className + ' matched';
    }
    const classNameWithAnimation = className + ' animate';

    return (
        <div
            onClick={() => {
                if (!props.matched && !props.imageUp) {
                    props.onClick(props.id);
                }
            }}
            className={props.imageUp ? classNameWithAnimation : className}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={`${backPath}`} draggable='false' alt='' />
                </div>
                <div className="flip-card-back">
                    <img src={`${imPath}`} draggable='false' alt='' />
                </div>
            </div>
        </div>
    );
}

CardView.propTypes = {
    matched: PropTypes.bool,
    imageUp: PropTypes.bool,
    onClick: PropTypes.func,
    id: PropTypes.number,
    image: PropTypes.number
};

export default CardView;
