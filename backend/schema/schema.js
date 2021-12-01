const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const CustomerDetails = new GraphQLObjectType({
  name: "CustomerDetails",
  fields: () => ({
    is_owner: { type: GraphQLInt },
    name: { type: GraphQLString, required: true },
    email_id: { type: GraphQLString, required: true, unique: true },
    password: { type: GraphQLString, required: true },
    date_of_birth: { type: GraphQLString },
    address_line_1: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipcode: { type: GraphQLInt },
    nick_name: { type: GraphQLString },
    phone_num: { type: GraphQLInt },
    profile_pic_file_path: { type: GraphQLString },
    // OrderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderDetails" }],
    favorite_restaurants: { type: Array },
  }),
});

const OrderDetails = new GraphQLObjectType({
  name: "OrderDetails",
  fields: () => ({
    order_status: { type: GraphQLString },
    delivery_status: { type: GraphQLString },
    order_total: { type: GraphQLInt },
    tax: { type: GraphQLInt },
    delivery_cost: { type: GraphQLInt },
    gratitude: { type: GraphQLInt },
    sub_total: { type: GraphQLInt },
    create_time: { type: Date, default: Date.now() },
    update_time: { type: Date, default: Date.now() },
    order_delivery_type: { type: GraphQLString },
    order_address_line_1: { type: GraphQLString },
    order_city: { type: GraphQLString },
    order_state: { type: GraphQLString },
    order_country: { type: GraphQLString },
    order_zipcode: { type: GraphQLInt },
    notes: { type: GraphQLString },
    restaurant_name: { type: GraphQLString },
    restaurant_image_file_path: { type: GraphQLString },
    restaurant_city: { type: GraphQLString },
    customer_name: { type: GraphQLString },
    customer_id: { type: Schema.Types.ObjectId, ref: "CustomerDetails" },
    restaurant_id: { type: Schema.Types.ObjectId, ref: "RestaurantDetails" },
    dishes: [
      { dish_id: String, dish_name: String, quantity: Number, price: Number },
    ],
  }),
});
const RestaurantDetails = new GraphQLObjectType({
  name: "RestaurantDetails",
  fields: () => ({
    is_owner: { type: GraphQLInt },
    name: { type: GraphQLString, required: true },
    email_id: { type: GraphQLString, required: true, unique: true },
    password: { type: GraphQLString, required: true },
    description: { type: GraphQLString },
    restaurant_address_line_one: { type: GraphQLString },
    restaurant_city: { type: GraphQLString },
    restaurant_state: { type: GraphQLString },
    restaurant_country: { type: GraphQLString },
    restaurant_zipcode: { type: GraphQLInt },
    image_file_path: { type: GraphQLString },
    phone_num: { type: GraphQLInt },
    restaurant_start_time: { type: GraphQLString },
    restaurant_end_time: { type: GraphQLString },
    restaurant_week_start: { type: GraphQLString },
    restaurant_week_end: { type: GraphQLString },
    national_brand: { type: GraphQLString },
    delivery_type: { type: GraphQLString },
  }),
});

const Dishes = new GraphQLObjectType({
  name: "Dishes",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    price: { type: GraphQLInt },
    image_file_path: { type: GraphQLString },
    category: { type: GraphQLString },
    dish_type: { type: GraphQLString },
    cuisine_type: { type: GraphQLString },
    restaurant_id: { type: Schema.Types.ObjectId, ref: "RestaurantDetails" },
    dish_start_time: { type: GraphQLString },
    dish_end_time: { type: GraphQLString },
    isActive: { type: GraphQLString },
    create_time: { type: Date, default: Date.now() },
    update_time: { type: Date, default: Date.now() },
  }),
});

const Favorites = new GraphQLObjectType({
  name: "Favorites",
  fields: () => ({
    customer_id: { type: GraphQLString },
    restaurant_id: { type: GraphQLString },
    is_fav: { type: GraphQLString },
  }),
});

// module.exports = {
//   CustomerDetails: model("CustomerDetails", CustomerDetails),
//   OrderDetails: model("OrderDetails", OrderDetails),
//   RestaurantDetails: model("RestaurantDetails", RestaurantDetails),
//   Dishes: model("Dishes", Dishes),
//   Favorites: model("Favorites", Favorites),
// };

const schema = new GraphQLSchema({
  CustomerDetails: CustomerDetails,
  OrderDetails: OrderDetails,
  RestaurantDetails: RestaurantDetails,
  Dishes: Dishes,
  Favorites: Favorites,
});

module.exports = schema;
