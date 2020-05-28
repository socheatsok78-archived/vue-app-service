function noop(...args) { }

export let warn = noop

if (process.env.NODE_ENV !== 'production') {
    warn = (msg) => {
        console.error(`[warn]: ${msg}`)
    }
}
