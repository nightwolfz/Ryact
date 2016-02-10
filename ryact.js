/**
 * @module Ryact
 * @link https://github.com/nightwolfz/Ryact
 * @author Ryan Megidov
 */
const React = require('react')

/**
 * Helper methods
 */
const isFunc = fn => typeof fn === 'function'
const orObject = item => item || {}
const orFunction = (fn) => isFunc(fn) ? fn : () => {}
const wrap = (object) => isFunc(object) ? { render: object } : object
const compose = (...fns) => composeRight(...fns.reverse())


/**
 * @method composeRight
 * @param {Function[]} fns
 * @return {Function}
 */
function composeRight(...fns) {

    const composeFn = function(a) {
        return fns.reduceRight((acc, fn) => fn.call(this, acc), a)
    }

    /**
     * @method toString
     * @return {String}
     */
    composeFn.toString = () => 'compose(' + fns.map(fn => fn.toString()).join(', ') + ')'

    return composeFn
}


/**
 * @method createWithCompose
 * @param {Object} component
 * @return {React.createClass}
 */
function createWithCompose(component){

    /**
     * @method provideArgs
     * @return {Object}
     */
    function provideArgs() {

        const refs = orObject(this.refs)
        const props = orObject(this.props)
        const state = orObject(this.state)
        const context = orObject(this.context)
        const store = context && orObject(context.stores)

        /**
         * @method setState
         * @param {Object} state
         * @return {Object}
         */
        const setState = state => {
            state != null && this.setState(state)
            return state
        }

        return { props, state, setState, refs, context, store }

    }

    return React.createClass(Object.assign({}, component, {

        componentWillMount: compose(provideArgs, orFunction(component.componentWillMount)),

        componentDidMount: compose(provideArgs, orFunction(component.componentDidMount)),

        componentWillUnmount: compose(provideArgs, orFunction(component.componentWillUnmount)),

        render: compose(provideArgs, component.render)

    }))

}

/**
 * This is our default export. Use it to return a valid React Component.
 * @method ryact
 * @param {Object|Function} component
 * @return {React.createClass}
 */
export default component => createWithCompose(wrap(component))
