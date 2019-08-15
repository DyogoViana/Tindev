// Login.js



import React, { useState } from "react";

// Importações.
import "./Login.css"; // Não precisa colocar o nome antes, já que só quero o arquivo. 
import api from "../services/api";
import logoTindev from "../assets/logoTindev.svg";



export default function Login({ history }) {
    const [userName, setUserName] = useState(""); // 'setUserName' para modificar e 'userName' para acessar.

    // Inicia quando o usuário enviar um submit no form.
    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post("/devs", {
            username: userName, // exemplo: "username": "arthurdebiase".
        });

        const { _id } = response.data;

        history.push(`/dev/${ _id }`); // Redireciona para a rota escolhida.
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