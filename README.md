# Ryact

Allows you to write your components like this:

```javascript
import ryact from '../../helpers/ryact'

const contextTypes = {
    stores: React.PropTypes.any
}

export const fetchData = ({store, params}) => {
    store.genericStore.doSomething()
}

export const render = ({ props, store }) => {
    return <div>
        store.genericStore.getSomething()
    </div>
}

export default ryact({fetchData, render})
```
