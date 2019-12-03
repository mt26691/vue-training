
const productReview = Vue.component('product-review', {
    template: `<form class="review-form" @submit.prevent="onSubmit">
        <p>
            <label for="name">Name:</label>
            <input id="name" type="text" v-model="name"/>
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.nmber="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <ul v-show="errors.length>0">
            <li v-for="error in errors">{{error}}</li>
        </ul>
        <input type="submit" value="Submit"/>
    </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    computed: {},
    methods: {
        onSubmit(event) {
            this.errors = [];
            if (!this.name) {
                this.errors.push("Name is required");
            }
            if (!this.review) {
                this.errors.push("review is required");
            }
            if (!this.rating) {
                this.errors.push("rating is required");
            }

            if (this.errors.length > 0) {
                return;
            }

            const productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            };
            this.$emit('review-submitted', productReview);
            this.name = null;
            this.review = null;
            this.rating = null;

            //emit something here
        }
    }
});

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
    components: {
        productReview: productReview
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

        <!-- for on event, we can use  @ for example @click or @mouseover-->
        <button @click="addToCart()" v-bind:disabled="!inStock" 
        :class="{disabledButton:!inStock}">Add to Cart</button>
        <ul>
            <li v-for="detail of details">{{detail.name}}</li>
        </ul>

    </div>

    <div>
        <h2>Reviews</h2>
        <p v-show="reviews.length===0">There are no review yet</p>
        <ul>
            <li v-for="review in reviews">
                <p>{{review.name}}</p>
                <p>{{review.review}}</p>
                <p>{{review.rating}}</p>
            </li>
        </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
            this.variants[this.selectedVariant].quanlity -= 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(reviewData) {
            this.reviews.push(reviewData);
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
        prenium: true,
        cart: []
    },
    methods: {
        updateCart(productId) {
            this.cart.push(productId);
        }
    },
    computed: {
        cartLength() {
            return this.cart.length;
        }
    },
});

