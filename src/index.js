import express from 'express';
import productRepo from './utils/productRepository.js';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static(path.resolve('src/public'))); /// static file
app.use(express.urlencoded({ extended: true })); // note
app.use(express.json());

// API endpoints

app.get('/ecomonic/products', async (req, res) => {
    const result = await productRepo.getProducts();
    res.send({
        data: result,
    });
});

app.post('/api/products', async (req, res) => {
    const result = await productRepo.createProduct(req.body);

    if (result.affectedRows !== 0) {
        return res.status(201).send({
            message: 'Product created successfully',
        });
    }

    res.statusCode(400).send({
        messsage: "Data can't insert into database",
    });
});

app.put('/api/products/:id', async (req, res) => {
    const result = await productRepo.updateProduct(req.body);

    if (result.affectedRows !== 0) {
        return res.status(201).send({
            message: 'Product updated successfully',
        });
    }

    res.statusCode(400).send({
        messsage: "Data can't updated into database",
    });
});

app.delete('/api/products/:id', async (req, res) => {
    const result = await productRepo.deleteProduct(req.body);

    if (result.affectedRows !== 0) {
        return res.status(201).send({
            message: 'Product deleted successfully',
        });
    }

    res.statusCode(400).send({
        messsage: "Data can't updated into database",
    });
});

// Render view endpoints
app.get('/add-product', async (req, res) => {
    res.render('product/addProduct');
});

app.get('/update-product', async (req, res) => {
    res.render('product/updateProduct');
});

app.get('/delete-product', async (req, res) => {
    res.render('product/deleteProduct');
});

app.get('/', async (req, res) => {
    const result = await userRepo.getProducts();
    res.render('home', { products: result });
});

app.listen(3000, (req, res) => {
    console.log('listening 3000');
});
