
const productComponent = Vue.component('product', {
    // we use props properties to received the props outside the comonent
    props: {
        message: {
            type: String,
            required: true,
            default: "Test"
        },
        prenium: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    template: ` <div class="product">
    <div class="product-image">
        <!-- v-bind dynamically binds an attribute to an expression  instead of v-bind:src we can just use :src-->
        <img v-bind:src="image" />
    </div>
    <div class="product-info">
      
        <h1>
            <a v-bind:href="voz">{{title}}</a>
        </h1>
        <p v-if="inventory>10">In stock</p>
        <p v-else-if="inventory <=10 && inventory >0">Near out of stock</p>
        <p v-else>Out of stock</p>
        <p>Shipping: {{shipping}}</p>
        <div v-for="(variant,index) in variants" :key="variant.variantId" class="color-box"
            :style="{backgroundColor:variant.variantColor}" @mouseover="updateProduct(index)">
        </div>
        <ul>
            <li v-for="detail of details">{{detail.name}}</li>
        </ul>

        <!-- for on event, we can use  @ for example @click or @mouseover-->
        <button @click="addToCart()" v-bind:disabled="!inStock" :class="{disabledButton:!inStock}">Add to Cart</button>
        <div class="cart">
            <p>Cart({{cart}})</p>
        </div>
    </div>
</div>`,
    data() {
        return {
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
                    "quanlity": 5
                },
                {
                    "variantId": 2235,
                    "variantColor": "blue",
                    "image": "./assets/vmSocks-blue-onWhite.jpg",
                    "quanlity": 5
                },
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
            this.variants[this.selectedVariant].quanlity -= 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {

            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quanlity > 0;
        },
        inventory() {
            return this.variants[this.selectedVariant].quanlity;
        },
        shipping() {
            if (this.prenium) {
                return "free";
            }
            return "2.99";
        }
    },
});
const app = new Vue({
    el: '#app',
    components: {
        product: productComponent
    },
    data: {
        prenium: true
    }

});

