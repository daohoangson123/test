import { connectToDatabase } from '../configDatabase.js';

// Connect to database
const db = await connectToDatabase();

class ProductRepository {
    constructor() {
        this.db = db;
    }

    async getProducts() {
        const [result] = await this.db.query('SELECT * FROM economic');
        return result;
    }

    async createProduct(body) {
        const { name, description, price, image } = body;

        const [result] = await db.query(
            'INSERT INTO `products` (`name`, `description`, `price`, `image`) VALUES(?, ?, ?, ?)',
            [name, description, price, image]
        );
        return result;
    }

    async updateProduct(body) {
        const { id, name, description, price, image } = body;

        const existProduct = await this.getProductById(id);

        const [result] = await db.query(
            'UPDATE `products` SET `name`, `description`, `price`, `image` WHERE id = ?',
            [existProduct, name, description, price, image]
        );
        return result;
    }

    async deleteProduct(body) {
        const { id } = body;

        const [result] = await db.query('DELETE FROM `users` WHERE id = ?', [
            id,
        ]);
        return result;
    }
}

export default new ProductRepository();
