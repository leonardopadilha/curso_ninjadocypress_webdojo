const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient') // importa o Prisma

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format.'})
  }
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error:  'The name is required'});
  }

  if (!email) {
    return res.status(400).json({ error:  'The email is required'});
  }

  if (!password) {
    return res.status(400).json({ error: 'The password is required'});
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password // In production, make sure to hash the password using bcrypt or a similar library.
      }
    });

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ message: 'User successfully registered.', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})