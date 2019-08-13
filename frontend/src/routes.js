// routes.js


import React from "react";
import { BrowserRouter, Route } from "react-router-dom";


// Rotas das páginas.
import Login from "./pages/Login";
import Main from "./pages/Main";


export default function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={ Login }/>
            <Route path="/main" component={ Main }/>
        </BrowserRouter>
    );
}





// Anotações:

// No BrowserRouter, a rota chamará o componente. Path é o caminho da URL. 