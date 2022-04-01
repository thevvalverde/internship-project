import React, {Fragment, StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './_app';
import reportWebVitals from '../reportWebVitals';
import About from './about-us';
import Contact from './contact';
import More from './see-more';
import Header from '../components/Header';
// import Home from '../components/Home';
import Login from './login';
import Register from './register';
import MyIframe from '../components/MyIframe';


export default function Home(props) {
  return (
    <Fragment>

            <h1 className="centered"> eXample </h1>
            <h4 className="centered">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
            <hr/>
            <h2 className="left-align"> Our work</h2>
            <div className="img-div left-align">
                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee</p>
                <img src="https://thumbs.dreamstime.com/b/traders-work-group-young-modern-men-formalwear-analyzing-stock-market-data-working-office-150889495.jpg" 
                    alt="Work picture"
                />
            </div>
            <hr/>
            <h2 className="right-align"> Our goals</h2>
            <div className="img-div">
                <img src="https://www.tradingacademy.com/assets/images/fec/how-stock-market-works.jpg" 
                    alt="Work picture"
                />
                <p className="right-align">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee</p>
            </div>
            <hr/>
    </Fragment>

    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
