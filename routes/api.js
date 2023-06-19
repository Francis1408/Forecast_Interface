import url from 'url'
import { PrismaClient } from '@prisma/client';
import express from 'express'
import _ from 'underscore'

const router = express.Router();
const prisma = new PrismaClient();

// Send data to BD by GET request

async function insertBdData(info) {
    const response = await prisma.weather.create({
        data: {
            temperature: parseFloat(info.dados['temp']),
            humidity: parseFloat(info.dados['umi'])
        }
    })
    console.log(response);
    return response;
    
}

let handleSendingData = function(method) {
    return function(req, res) {
        let info = {};

        info.metodo = method;
        info.cru = url.parse(req.url).query;
        info.dados = req.query;
        info.lista = _.map(req.body, function(value, key){
            return {nome : key, valor : value};
        });
        info.dados['temp'] = isNaN(info.dados['temp']) ? 0 : info.dados['temp'];
        info.dados['umi'] =  isNaN(info.dados['umi']) ? 0 : info.dados['umi'];

        res.json(insertBdData(info));
    }

}

let insertData = handleSendingData('GET');

router.get('/', insertData);

export default router
