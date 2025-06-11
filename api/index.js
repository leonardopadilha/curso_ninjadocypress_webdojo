const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient') // importa o Prisma

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado!' })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password // Em produção, você deve criptografar a senha com bcrypt!
      }
    })

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao registrar usuário.' })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})