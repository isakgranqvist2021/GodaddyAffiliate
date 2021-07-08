import React from 'react';
import ReactDOM from 'react-dom';

import PickComponent from './src/Components/Pick/PickComponent';
import CreateComponent from './src/Components/Create/CreateComponent';
import SearchComponent from './src/Components/Search/SearchComponent';
import ResultsComponent from './src/Components/Results/ResultsComponent';

import RegisterComponent from './src/Components/Auth/RegisterComponent';
import LoginComponent from './src/Components/Auth/LoginComponent';

const components = [
    {
        selector: '#PickComponent',
        Component: PickComponent
    },
    {
        selector: '#CreateComponent',
        Component: CreateComponent
    },
    {
        selector: '#SearchComponent',
        Component: SearchComponent
    },
    {
        selector: '#ResultsComponent',
        Component: ResultsComponent
    },
    {
        selector: '#RegisterComponent',
        Component: RegisterComponent
    },
    {
        selector: '#LoginComponent',
        Component: LoginComponent
    }
];

(function main() {
    components.forEach(component => {
        let element = document.querySelector(component.selector);

        if (element !== null) {
            ReactDOM.render(<component.Component />, element);
        }
    });
})();