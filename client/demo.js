const toy = {
    picture: "path/to/picture.jpg",
    name: "Action Figure",
    sellerName: "Toy World",
    sellerEmail: "toyworld@example.com",
    subCategory: "Superheroes",
    price: "$19.99",
    rating: 4.5,
    availableQuantity: 10,
    detailDescription: "This action figure is highly detailed and perfect for superhero enthusiasts. It comes with various accessories and articulation for realistic poses. Suitable for ages 5 and up.",
};

const toyArray = [
    {
        id: "picture",
        type: "text",
        label: "Picture",
        name: "picture",
    },
    {
        id: "name",
        type: "text",
        label: "Name",
        name: "name",
    },
    {
        id: "subCategory",
        type: "select",
        label: "Sub Category",
        name: "subCategory",
    },
    {
        id: "price",
        type: "number",
        label: "Price",
        name: "price",
    },
    {
        id: "rating",
        type: "number",
        label: "Rating",
        name: "rating",
    },
    {
        id: "availableQuantity",
        type: "number",
        label: "Available Quantity",
        name: "availableQuantity",
    },
    {
        id: "detailDescription",
        type: "textarea",
        label: "Detail Description",
        name: "detailDescription",
    },
];
