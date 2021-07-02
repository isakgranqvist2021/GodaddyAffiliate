import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App';
import PickTemplate from './src/PickTemplate';


(function main() {
    switch(window.location.pathname) {
        case '/pick-template': 
            ReactDOM.render(<PickTemplate/>, document.querySelector('#pick-template'));
        break;
    }
})();