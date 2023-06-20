import url from 'url'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import _ from 'underscore'

const router = express.Router();
const prisma = new PrismaClient();

// Send data to BD by GET request
router.get('/', async (req, res, next) =>{
    let info = {}; 

    info.metodo = 'GET';
    info.cru = url.parse(req.url).query;
    info.dados = req.query;
    info.lista = _.map(req.body, function(value, key){
        return {nome : key, valor : value};
    });
    info.dados['temp'] = isNaN(info.dados['temp']) ? 0 : info.dados['temp'];
    info.dados['umi'] =  isNaN(info.dados['umi']) ? 0 : info.dados['umi'];

    try {
        const response = await prisma.weather.create({
            data: {
                temperature: parseFloat(info.dados['temp']),
                humidity: parseFloat(info.dados['umi'])
            }
        })
        console.log(response);
        res.json(response);
        
    } catch (error) {
        console.error(error)
        next(error);
    }
});

export default router
