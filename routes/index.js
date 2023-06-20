import express from 'express'
import _ from 'underscore'
import { PrismaClient } from '@prisma/client'

const router = express.Router();
const prisma = new PrismaClient();

// Fetch the entire table and shows the last content

router.get('/', async (req, res, next) => {

    try {
        const content = await prisma.weather.findMany();
        console.log(content[0]);

        res.render('index', {
            temp : content[0].temperature,
            hum : content[0].humidity,
            time : content[0].time
        }); 

    } catch (error) {
        console.log(error)
        next(error)
    }
    
});

export default router