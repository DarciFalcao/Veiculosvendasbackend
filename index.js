const { PrismaClient } = require('@prisma/client/')
const prisma = new PrismaClient()
const express = require('express')
const cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json())


server.get('/veiculos', async (req, res) => {
    const veiculos = await prisma.veiculos.findMany()
    return res.json(veiculos)
})

server.post('/veiculos', async (req, res) => {

    if (await isPlacaCadastrada(req.body.placa)) {
        return res.status(500).json({ msg: 'Placa ja cadastrada' })
    } else {
        const veiculo = await prisma.veiculos.create({
            data: req.body
        })
        return res.json(veiculo)
    }
})

server.delete('/veiculos/:placa', async (req, res) => {
    const veiculo = await prisma.veiculos.delete({
        where: {
            placa: req.params.placa
        }
    })
    return res.json(veiculo)
})

server.put('/veiculos/:placa', async (req, res) => {

    if (await isPlacaCadastrada(req.body.placa)) {

        return res.status(500).json({ msg: 'Placa já cadastrada' })

    } else if (!await isPlacaCadastrada(req.params.placa)) {

        return res.status(500).json({ msg: 'Placa antiga não encontrada' })

    } else {
        const veiculo = await prisma.veiculos.update({
            data: req.body,
            where: {
                placa: req.params.placa
            }
        })
        return res.json(veiculo)
    }
})


async function isPlacaCadastrada(placa) {
    try {
        const veiculoPlaca = await prisma.veiculos.findUnique({
            where: {
                placa: placa
            }
        })
        return !!veiculoPlaca
    } catch {
        return false

    }
}


server.listen(3333)