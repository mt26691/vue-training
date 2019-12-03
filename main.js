const app = new Vue({
    el: '#app',
    data: {
        product: 'first product1',
        description: 'A pair of warm, fuzzy socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        voz: 'https://forums.voz.vn/',
        inventory: 10,
        details: [
            { name: "80% cotton" },
            { name: "20% polyester" },
            { name: "Gender neutral" }
        ],
        variants: [
          {"variantId":2234, "variantColor":"green"},
          {"variantId":2235, "variantColor":"blue"},
        ],
    }
});