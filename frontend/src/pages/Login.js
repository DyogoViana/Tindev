// Login.js



import React, { useState } from "react";

import "./Login.css"; // Não precisa colocar o nome antes, já que só quero o arquivo. 
import logoTindev from "../assets/logoTindev.svg";

export default function Login({ history }) {
    const [userName, setUserName] = useState(""); // 'setUserName' para modificar e 'userName' para acessar.

    // Inicia quando o usuário enviar um submit no form.
    function handleSubmit(event) {
        event.preventDefault();

        console.log(userName);

        history.push("/main"); // Redireciona para a rota escolhida.
    }

    return(
        <div className="login-container">
            <form onSubmit= { handleSubmit }>
                <img src={ logoTindev } alt="Logo Tindev"/>
                <input 
                    placeholder="Digite seu usuário do GitHub."
                    value={ userName }
                    onChange={ event => setUserName(event.target.value) } // Toda mudança que houver no 'input'.
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}