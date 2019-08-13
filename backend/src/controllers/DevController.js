// DevController.js


//Importa API's.
const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
    // Listagem de usuários.
    async index (requisição, resposta) {
        const { user } = requisição.headers;
        const loggedDev = await Dev.findById(user);

        // Retorna apenas usuários que não estão dentro da lista de likes, dislikes e user igual do usuário logado.
        const users = await Dev.find({ // '$and', aplica os 3 filtros de uma vez só e não um de cada vez.
            $and: [
                {_id: { $ne: user } }, // '$ne' = not equal. Verifica se os ID's são diferentes.
                {_id: { $nin: loggedDev.likes } }, // '$nin' = ñ esteja. Exclui todos os usuários que deram likes.
                {_id: { $nin: loggedDev.dislikes } }
            ],
        })
        
        return resposta.json(users);
    },

    async store(requisição, resposta) {
        const { username } = requisição.body;
        
        // procura usuários repetidos.
        const userExists = await Dev.findOne({ user: username });
        if (userExists) {
            return resposta.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        const {name, bio, avatar_url: avatar} = response.data;

        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar
         });

        return resposta.json(dev);
    }
};



// Anotação:

// Por ser assíncrona (async), a resposta não vem direta, demora um pouco para executar e precisa avisar para esperar (await), antes de passar para a próxima linha.