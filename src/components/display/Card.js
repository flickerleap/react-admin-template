import React from 'react';

const buttonDefault = {
    href: '',
    label: '',
    className: 'btn btn-primary'
};

const Card = ({title = '', text = '', image = '', button = {buttonDefault}}) => (
    <div className="card">
        {image && <img className="card-img-top" src={image} alt="Card image cap" />}
        <div className="card-body">
            {title && <h5 className="card-title">{title}</h5>}
            {text && <div className="card-text">{text}</div>}
            {button.href && <a href={button.href} className={button.className}>{button.label}</a>}
        </div>
    </div>
);

  export default Card;
