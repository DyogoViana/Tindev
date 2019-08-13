// Dev.js


const { Schema, model } = require("mongoose");

// Dados para os usuários no gitHub.
const DevSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },

    user: {
        type: String,
        required: true,
    },

    bio: String, // como não é obrigatório, pode passar direto.

    avatar: {
        type: String, // string pq não vai armazenar uma imagem, somnete o endereço. 
        required: true,
    },

    likes:[{
        type: Schema.Types.ObjectId, // ObjectId, é o ID numérico do usuário.
        ref: "Dev",
    }],

    dislikes:[{
        type: Schema.Types.ObjectId,
        ref: "Dev",
    }], 

}, {
    timestamps: true, // cria colunas de forma automática -- createdAt (guarda a data de criação do registro) & updatedAt (armazena a data da ultima alteração do registro). Tudo feito pelo 'mongoose'.
});

// Exporta os models
module.exports = model("Dev", DevSchema);