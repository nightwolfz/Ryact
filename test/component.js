const ryact = require('../ryact');

export function fetchData({ store, params }) {
    console.log('ASYNC CALL');
}

export function render({ props, store }) {
    return <div>
        Hello World
    </div>
}

export default ryact({ fetchData, render })
