import express from 'express'
import _ from 'underscore'
import { PrismaClient } from '@prisma/client'

const router = express.Router();
const prisma = new PrismaClient();

// Fetch the entire table and shows the last content

router.get('/', async (req, res, next) => {

    try {
        const content = await prisma.weather.findMany();
        const data = content.pop();
        console.log(data);

        res.render('index', {
            temp : data.temperature,
            hum : data.humidity,
            time : data.time
        }); 

    } catch (error) {
        console.log(error)
        next(error)
    }
    
});

export default router