import './styles.css';

// lodash & pontify
var debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import {error} from '@pnotify/core/dist/PNotify.js';

// js & templates
import getRefs from './js/refs';
import fetchCountries from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import allCountriesListTpl from './templates/list-of-countries.hbs';

// import selectedItem from './js/selectAnItem';

const refs = getRefs();

refs.userSearch.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
    e.preventDefault();
    const searchQuery = e.target.value;


    fetchCountries(searchQuery).then(data => {
        if (data.status === 404) {
            errorMessage('Nothing was found! Try again');
        }
        if (data.length === 1) {
            createCountryCard(data);
        }

        if (data.length >= 2 && data.length <= 10) {
            createCountriesList(data);
        }

        if (data.length > 10) {
            refs.result.innerHTML = '';
            errorMessage('Too many matches found. Please enter more specific query!')
        }
    });
        
}

function errorMessage(message) {
    error({
        title: `${message}`
    });
}

function createCountryCard(data) {
    const markup = countryCardTpl(data);
    refs.result.innerHTML = markup;
}

function createCountriesList(data) {
    const markup = allCountriesListTpl(data);
    refs.result.innerHTML = markup;
}
