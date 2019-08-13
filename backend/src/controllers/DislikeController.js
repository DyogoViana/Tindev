// DislikeController.js



// Importações.
const Dev = require("../models/Dev");

module.exports = {
    async store(requisição, resposta) {
        const { user } = requisição.headers;
        const { devId } = requisição.params;

        const loggedDev = await Dev.findById(user); // Usuário logado que vai dar o like.
        const targetDev = await Dev.findById(devId); // Usuário que recebeu o like.

        // caso o usuário que recebeu o like não exista, aparece essa mensagem de erro.
        if (!targetDev) {
            return resposta.status(400).json({ error: "Desenvolvedor não existe" });
        }
 
        // salvar os dislikes.
        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return resposta.json(loggedDev);
    }
};