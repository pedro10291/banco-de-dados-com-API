import express from 'express'
import { PrismaClient } from '@prisma/client'

// Inicializa o Prisma Client
const prisma = new PrismaClient()

const app = express()
app.use(express.json()) // Permite que o Express lide com dados JSON no corpo das requisições

// Rota POST para criar um novo usuário
app.post('/usuarios', async (req, res)=>{

    await prisma.user.create({ // Usa o Prisma para criar um novo usuário no banco de dados
        data:{
            email: req.body.email, // Extrai o email do corpo da requisição
            name: req.body.name,   // Extrai o nome do corpo da requisição
            age: req.body.age     // Extrai a idade do corpo da requisição
        }
    })
    
    res.status(201).json(req.body) // Retorna o corpo da requisição com status 201 (Created)
})

// Rota GET para buscar usuários
app.get('/usuarios', async (req, res) =>{

    let user=[]

    if(req.query){ // Verifica se há parâmetros de consulta na URL
        user = await prisma.user.findMany({ // Busca usuários com base nos parâmetros fornecidos
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else{
        const users = await prisma.user.findMany() // Se não houver parâmetros, busca todos os usuários
    }

    res.status(200).json(user) // Retorna os usuários encontrados com status 200 (OK)
})

// Rota PUT para atualizar um usuário
app.put('/usuarios/:id', async (req, res)=>{

    await prisma.user.update({ // Atualiza o usuário com o ID fornecido na URL
        where:{
            id: req.params.id // Extrai o ID da URL
        },
        data:{
            email: req.body.email, // Extrai o email do corpo da requisição
            name: req.body.name,   // Extrai o nome do corpo da requisição
            age: req.body.age     // Extrai a idade do corpo da requisição
        }
    })
    
    res.status(201).json(req.body) // Retorna o corpo da requisição com status 201 (Created)
})

// Rota DELETE para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({ // Deleta o usuário com o ID fornecido na URL
        where: {
            id: req.params.id // Extrai o ID da URL
        }
    })

    res.status(200).json({Message:'Usuario deletado com sucesso'}) // Retorna uma mensagem de sucesso com status 200 (OK)
})

app.listen(3000) // Inicia o servidor na porta 3000

// Criar nossa API de Usuários
// - Criar um usuário
// - Listar todos os usuários
// - Editar um usuários
// - Deletar um usuários

