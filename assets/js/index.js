import React from 'react';
import ReactDOM from 'react-dom';

import PickComponent from './src/Components/Pick/PickComponent';
import CreateComponent from './src/Components/Create/CreateComponent';
import SearchComponent from './src/Components/Search/SearchComponent';
import ResultsComponent from './src/Components/Results/ResultsComponent';
import LoginComponent from './src/Components/Login/LoginComponent';
import ModalComponent from './src/Components/Modal/ModalComponent';
import CurrComponent from './src/Components/Curr/CurrComponent';
import OrderComponent from './src/Components/Order/OrderComponent';
import FilesComponent from './src/Components/Order/FilesComponent';
import HireComponent from './src/Components/Hire/HireComponent';

const components = [
    { selector: '#PickComponent', Component: PickComponent },
    { selector: '#CreateComponent', Component: CreateComponent },
    { selector: '#SearchComponent', Component: SearchComponent },
    { selector: '#ResultsComponent', Component: ResultsComponent },
    { selector: '#LoginComponent', Component: LoginComponent },
    { selector: '#ModalComponent', Component: ModalComponent },
    { selector: '#CurrComponent', Component: CurrComponent },
    { selector: '#OrderComponent', Component: OrderComponent },
    { selector: '#FilesComponent', Component: FilesComponent },
    { selector: '#HireComponent', Component: HireComponent }
];

(function main() {
    components.forEach(component => {
        let element = document.querySelector(component.selector);

        if (element !== null) {
            ReactDOM.render(<component.Component />, element);
        }
    });
})();