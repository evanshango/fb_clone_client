import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "./styles/icons/icons.css"
import App from "./App"

import {createBrowserHistory} from 'history'
import {BrowserRouter} from 'react-router-dom'
import {store} from "./store/store"
import {Provider} from "react-redux"

export const history = createBrowserHistory()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
