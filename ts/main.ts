import { displayAppInfo, greetUser } from './utils';
import { currentUser } from './data';

function initApp() {
    console.log(displayAppInfo());
    console.log(greetUser(currentUser));
}

document.addEventListener('DOMContentLoaded', initApp);