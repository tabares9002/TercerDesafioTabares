import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0


    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title, 
            description, 
            price, 
            image, 
            code, 
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find( product => product.id === id)){
        console.log("Producto no encontrado")
        } else {
        console.log(respuesta3.find( product => product.id === id))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
    }

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productsModified = [ { ...producto, id }, ...productOld]
        await fs.writeFile(this.patch, JSON.stringify(productsModified))
    }

}

    const productos = new ProductManager

    productos.addProduct('Monitor LG', 'Monitor 24 pulgadas', '250', 'https://http2.mlstatic.com/D_NQ_NP_972063-MLA54964158858_042023-O.webp', '2104Anode ', '15')
    productos.addProduct('Parlantes Genius', 'Parlantes 8 wats', '15', 'https://http2.mlstatic.com/D_NQ_NP_972063-MLA54964158858_042023-O.webp', '2106Anode ', '25')
    productos.addProduct('Mouse Logitech', 'Mouse Negro', '20', 'https://http2.mlstatic.com/D_NQ_NP_972063-MLA54964158858_042023-O.webp', '2107Anode ', '30')