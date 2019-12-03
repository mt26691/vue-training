const app = new Vue({
    el: '#app',
    data: {
        brand: 'Manh Tung',
        product: 'first product1',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        voz: 'https://forums.voz.vn/',
        details: [
            { name: "80% cotton" },
            { name: "20% polyester" },
            { name: "Gender neutral" }
        ],
        variants: [
            {
                "variantId": 2234,
                "variantColor": "green",
                "image": "./assets/vmSocks-green-onWhite.jpg",
                "quanlity":5
            },
            {
                "variantId": 2235,
                "variantColor": "blue",
                "image": "./assets/vmSocks-blue-onWhite.jpg",
                "quanlity":5
            },
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1;
            this.variants[this.selectedVariant].quanlity -=1;
        },
        updateProduct(index) {
           this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image(){
           
            return this.variants[this.selectedVariant].image;
        },
        inStock(){
            return this.variants[this.selectedVariant].quanlity >0;
        },
        inventory(){
            return this.variants[this.selectedVariant].quanlity;
        }
    },
   
});