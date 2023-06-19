import express from 'express'
import url from 'url'
import _ from 'underscore'

const router = express.Router();


// GET home page

let handleSendingData = function(method) {
    return function(req, res) {
        let info = {};

        info.metodo = method;
        info.cru = url.parse(req.url).query;
        info.dados = req.query;
        info.lista = _.map(req.body, function(value, key){
            return {nome : key, valor : value};
        });
        
        res.render('index', info);
    }

}

let getData = handleSendingData('GET');

router.get('/', getData);

export default router