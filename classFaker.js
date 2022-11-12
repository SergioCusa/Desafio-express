import { faker } from "@faker-js/faker";
faker.locale = "es"
const {commerce,image} = faker


const genUser = () => {
    return {
        nombre: commerce.product(),
        precio: commerce.price(),
        foto: image.avatar()

    }
}

export default genUser