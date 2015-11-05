# Ryact

Allows you to write your components like this:

```javascript
import ryact from 'ryact'

const contextTypes = {
    stores: React.PropTypes.any
}

export function fetchData({ store, params }) {
    store.genericStore.doSomething()
}

export function render({ props, store }) {
    return <div>
        store.genericStore.getSomething()
    </div>
}

export default ryact({ fetchData, render })
```
