// Main.js



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Cria um link, nesse caso usei para pg inicial na logo 'Tindev'.
import "./Main.css";


// Importações.
import api from "../services/api";
import logoTindev from "../assets/logoTindev.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";


export default function Main({ match }) { // 'macth' tem todos os parâmetros passados para essa rota.
    const [users, setUsers] = useState([]); // Vazio pq vai armazenar vários usuários.

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get("/devs", {
                headers: {
                    user: match.params.id,
                }
            })

            setUsers(response.data); // Preenche o 'setUsers' com o respone.data, que são os dados dos users.
        }

        loadUsers();
    }, [ match.params.id ]);

    // Like
    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        });

        setUsers(users.filter(user => user._id !== id));

        console.log("Dei um like!", id);
    }

    // Dislike
    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        });

        setUsers(users.filter(user => user._id !== id)); // Retira os que levaram dislike, sem carregar a página.

        console.log("Dei um dislike!", id);
    }

    return (
        <div className="main-container">
            {/* link para página inicial, usando a logo do Tindev. */}
            <Link to="/">
                <img src={ logoTindev } alt="Logo Tindev"/> 
            </Link>

            { users.length > 0 ? (
                <ul>
                    { users.map(user => (
                        <li key={ user._id }> {/* O primeiro elemento depois do 'map' tem que usar o 'key', com um valor único (no caso o ID). Assim n precisa renderizar toda vez quando houver uma mudança (o que seria ruim para a performance).*/}
                            {/* info do usuário. */}
                            <img src={ user.avatar } alt={ user.name }/>
                            <footer>
                                <strong>{ user.name }</strong>
                                <p>{ user.bio }</p>
                            </footer>
                            
                            {/* Botões de like e dislike. */}
                            <div className="buttons">
                                <button type="button" onClick={ () => handleDislike(user._id) }>
                                    <img src={ dislike } alt="icone dislike"/>
                                </button>

                                <button type="button" onClick={ () => handleLike(user._id) }>
                                    <img src={ like } alt="icone like"/>
                                </button>
                            </div>
                        </li> 
                    ))}
                </ul>
            ) : (
                <div className="empty"> Acabou :( </div> // ação para quando não tiver nenhum usuário na tela (vazia).
            )};
        </div>
    )
}
