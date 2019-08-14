// Login.js



import React, { useState } from "react";

import "./Login.css"; // Não precisa colocar o nome antes, já que só quero o arquivo. 
import logoTindev from "../assets/logoTindev.svg";

export default function Login() {
    return(
        <div className="login-container">
            <form>
                <img src={ logoTindev } alt="Logo Tindev"/>
                <input placeholder="Digite seu usuário do GitHub."/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}