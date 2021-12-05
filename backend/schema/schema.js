const graphql = require("graphql");
const md5 = require("md5");
const {
  CustomerDetails,
  OrderDetails,
  RestaurantDetails,
  Dishes,
} = require("../Models/Models");
const db = require("../Utils/connection");
const jwt = require("jsonwebtoken");
const { secret } = require("../Utils/config");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLUnionType,
} = graphql;

const CustomerDetailsType = new GraphQLObjectType({
  name: "CustomerDetails",
  fields: () => ({
    is_owner: { type: GraphQLInt },
    name: { type: GraphQLString },
    email_id: { type: GraphQLString },
    password: { type: GraphQLString },
    date_of_birth: { type: GraphQLString },
    address_line_1: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipcode: { type: GraphQLInt },
    nick_name: { type: GraphQLString },
    phone_num: { type: GraphQLInt },
    profile_pic_file_path: { type: GraphQLString },
    // favorite_restaurants: { type: GraphQLList },
    customer_id: { type: GraphQLString },
  }),
});

const OrderDetailsType = new GraphQLObjectType({
  name: "OrderDetails",
  fields: () => ({
    order_status: { type: GraphQLString },
    delivery_status: { type: GraphQLString },
    order_total: { type: GraphQLInt },
    tax: { type: GraphQLInt },
    delivery_cost: { type: GraphQLInt },
    gratitude: { type: GraphQLInt },
    sub_total: { type: GraphQLInt },
    // create_time: { type: Date, default: Date.now() },
    // update_time: { type: Date, default: Date.now() },
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
    customer_id: { type: GraphQLString },
    restaurant_id: { type: GraphQLString },
    // dishes: [
    //   { dish_id: String, dish_name: String, quantity: Number, price: Number },
    // ],
  }),
});
const RestaurantDetailsType = new GraphQLObjectType({
  name: "RestaurantDetails",
  fields: () => ({
    is_search_result: { type: GraphQLInt },
    is_owner: { type: GraphQLInt },
    name: { type: GraphQLString },
    email_id: { type: GraphQLString },
    restaurant_id: { type: GraphQLString },
    password: { type: GraphQLString },
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

const DishesType = new GraphQLObjectType({
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
    restaurant_id: { type: GraphQLString },
    dish_start_time: { type: GraphQLString },
    dish_end_time: { type: GraphQLString },
    isActive: { type: GraphQLString },
    create_time: { type: GraphQLString },
    update_time: { type: GraphQLString },
  }),
});

const customerRestaurantDetailsType = new GraphQLObjectType({
  name: "customerRestaurantDetails",
  fields: () => ({
    is_owner: { type: GraphQLInt },
    name: { type: GraphQLString },
    email_id: { type: GraphQLString },
    password: { type: GraphQLString },
    date_of_birth: { type: GraphQLString },
    address_line_1: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipcode: { type: GraphQLInt },
    nick_name: { type: GraphQLString },
    profile_pic_file_path: { type: GraphQLString },
    customer_id: { type: GraphQLString },
    restaurant_id: { type: GraphQLString },
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

const signInOutputType = new GraphQLObjectType({
  name: "signInOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    data: { type: GraphQLString },
    user: { type: customerRestaurantDetailsType },
    token: { type: GraphQLString },
  }),
});

const getRestaurantsOutputType = new GraphQLObjectType({
  name: "getRestaurantsOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    allRestaurants: { type: new GraphQLList(RestaurantDetailsType) },
  }),
});

const getAllDishesOutputType = new GraphQLObjectType({
  name: "getAllDishesOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    allDishes: { type: new GraphQLList(DishesType) },
  }),
});

const getCompletedOrdersOutputType = new GraphQLObjectType({
  name: "getCompletedOrdersOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    orders: { type: new GraphQLList(OrderDetailsType) },
  }),
});
const addOrderIds = (orders) => {
  const modifiedOrders = orders.map((order) => {
    let modifiedOrder = JSON.parse(JSON.stringify(order));
    modifiedOrder.order_id = order._id;
    return modifiedOrder;
  });
  return modifiedOrders;
};

const getCancelledOrdersOutputType = new GraphQLObjectType({
  name: "getCancelledOrdersOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    orders: { type: new GraphQLList(OrderDetailsType) },
  }),
});

const getNewOrdersOutputType = new GraphQLObjectType({
  name: "getNewOrdersOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    orders: { type: new GraphQLList(OrderDetailsType) },
  }),
});

const getOrderStatusOutputType = new GraphQLObjectType({
  name: "getOrderStatusOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    orders: { type: new GraphQLList(OrderDetailsType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    login: {
      type: signInOutputType,
      args: {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        const hashedPassword = md5(args.password);
        return new Promise(function (resolve, reject) {
          RestaurantDetails.findOne(
            { email_id: args.email, password: hashedPassword },
            (error, result) => {
              if (error) {
                console.log(
                  "Fetching restaurant details error in SignIn request handler",
                  error
                );
                resolve({ errCode: 500 });
                return;
              }
              if (result) {
                let modifiedData = JSON.parse(JSON.stringify(result));
                modifiedData.restaurant_id = result._id;
                const token = jwt.sign({ _id: result }, secret);

                console.log("Restaurant Owner Authentication Success");
                resolve({
                  status: "Authentication Successful",
                  user: modifiedData,
                  token,
                });
                return;
              } else {
                CustomerDetails.findOne(
                  { email_id: args.email, password: hashedPassword },
                  (error, result) => {
                    if (error) {
                      console.log(
                        "Fetching customer details error in SignIn request handler"
                      );
                      resolve({ errCode: 500 });
                      return;
                    }
                    if (result) {
                      let modifiedCustomerData = JSON.parse(
                        JSON.stringify(result)
                      );
                      modifiedCustomerData.customer_id = result._id;
                      const token = jwt.sign({ _id: result }, secret);

                      console.log("Customer Authentication Success");
                      resolve({
                        status: "Authentication Successful",
                        user: modifiedCustomerData,
                        token,
                      });
                      return;
                    } else {
                      console.log(
                        "Authenticaion Failure - SignIn Request Handler"
                      );
                      resolve({
                        errCode: 400,
                        status: "Authentication Failed",
                      });
                      return;
                    }
                  }
                );
              }
            }
          );
        });
      },
    },

    getRestaurants: {
      type: getRestaurantsOutputType,
      args: {},
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          RestaurantDetails.find({}, (err, restaurantsdata) => {
            if (err) {
              resolve({
                errCode: 400,
                status: "RESTAURANTS_NOT_FOUND",
              });
              return;
            }
            const modifiedRestaurantsData = restaurantsdata.map(
              (restaurant) => {
                let modifiedRestaurant = JSON.parse(JSON.stringify(restaurant));
                modifiedRestaurant.restaurant_id = restaurant._id;
                modifiedRestaurant.is_search_result = 1;
                return modifiedRestaurant;
              }
            );
            resolve({
              status: "ALL_RESTAURANTS",
              allRestaurants: modifiedRestaurantsData,
            });
            return;
          });
        });
      },
    },

    getAllDishes: {
      type: getAllDishesOutputType,
      args: {
        restaurant_id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          Dishes.find(
            { restaurant_id: args.restaurant_id, isActive: "true" },
            (err, dishes) => {
              if (err) {
                resolve({
                  errCode: 400,
                  status: "DISHES_WITH_RESTAURANT_ID_NULL_NOT_FOUND",
                });
                return;
              }
              const modifiedDishes = dishes.map((dish) => {
                let modifiedDish = JSON.parse(JSON.stringify(dish));
                modifiedDish.dish_id = dish._id;
                return modifiedDish;
              });
              resolve({
                status: "ALL_DISHES",
                allDishes: modifiedDishes,
              });
              return;
            }
          );
        });
      },
    },

    getCompletedOrders: {
      type: getCompletedOrdersOutputType,
      args: {
        restaurant_id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          OrderDetails.find(
            { restaurant_id: args.restaurant_id, order_status: "Completed" },
            (err, data) => {
              if (err) {
                resolve({
                  errCode: 400,
                  status: "NO_RESTAURANT_ID",
                });
                return;
              }
              resolve({
                status: "COMPLETED_ORDERS",
                orders: addOrderIds(data),
              });
            }
          );
        });
      },
    },

    getCancelledOrders: {
      type: getCancelledOrdersOutputType,
      args: {
        restaurant_id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          OrderDetails.find(
            { restaurant_id: args.restaurant_id, order_status: "Cancelled" },
            (err, data) => {
              if (err) {
                resolve({
                  errCode: 400,
                  status: "NO_RESTAURANT_ID",
                });
                return;
              }
              resolve({
                status: "CANCELLED_ORDERS",
                orders: addOrderIds(data),
              });
            }
          );
        });
      },
    },

    getNewOrders: {
      type: getNewOrdersOutputType,
      args: {
        restaurant_id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          OrderDetails.find(
            { restaurant_id: args.restaurant_id, order_status: "Active" },
            (err, data) => {
              if (err) {
                resolve({
                  errCode: 400,
                  status: "NO_RESTAURANT_ID",
                });
                return;
              }
              resolve({
                status: "NEW_ORDERS",
                orders: addOrderIds(data),
              });
            }
          );
        });
      },
    },

    getOrderStatus: {
      type: getOrderStatusOutputType,
      args: {
        customer_id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          OrderDetails.find({ customer_id: args.customer_id }, (err, data) => {
            if (err) {
              resolve({
                errCode: 400,
                status: "CUSTOMER_ID_NULL",
              });
              return;
            }
            resolve({
              status: "CUSTOMER_ORDERS",
              orders: addOrderIds(data),
            });
          });
        });
      },
    },
  },
});

// const Mutation = new GraphQLObjectType({
//   name: "mutation",
//   fields: {

//   },
// });

const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation,
});
module.exports = schema;
