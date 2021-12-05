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

const getOwnerRestaurantDetailsOutputType = new GraphQLObjectType({
  name: "getOwnerRestaurantDetailsOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    user: { type: RestaurantDetailsType },
  }),
});

const getRestaurantDetailsOutputType = new GraphQLObjectType({
  name: "getRestaurantDetailsOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    restaurentDetails: { type: RestaurantDetailsType },
  }),
});

const getSearchRestaurantsOutputType = new GraphQLObjectType({
  name: "getSearchRestaurantsOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    allRestaurants: { type: new GraphQLList(RestaurantDetailsType) },
  }),
});

const addRestaurantIds = (Restaurants) => {
  const modifiedRestaurants = Restaurants.map((Restaurant) => {
    let modifiedRestaurant = JSON.parse(JSON.stringify(Restaurant));
    modifiedRestaurant.restaurant_id = Restaurant._id;
    modifiedRestaurant.is_search_result = 1;
    return modifiedRestaurant;
  });
  return modifiedRestaurants;
};

const addRestaurantIds2 = (Restaurants) => {
  const modifiedRestaurants = Restaurants.map((Restaurant) => {
    let modifiedRestaurant = JSON.parse(JSON.stringify(Restaurant));
    modifiedRestaurant.restaurant_id = Restaurant._id;
    modifiedRestaurant.is_search_result = 0;
    return modifiedRestaurant;
  });
  return modifiedRestaurants;
};

const signUpCustomerOutputType = new GraphQLObjectType({
  name: "signUpCustomerOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    user: { type: RestaurantDetailsType },
  }),
});

const profileCustomerOutputType = new GraphQLObjectType({
  name: "profileCustomerOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    user: { type: CustomerDetailsType },
  }),
});

const signUpOwnerOutputType = new GraphQLObjectType({
  name: "signUpOwnerOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    user: { type: CustomerDetailsType },
  }),
});

const profileOwnerOutputType = new GraphQLObjectType({
  name: "profileOwnerOutputType",
  fields: () => ({
    status: { type: GraphQLString },
    errCode: { type: GraphQLInt },
    user: { type: RestaurantDetailsType },
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

    getOwnerRestaurantDetails: {
      type: getOwnerRestaurantDetailsOutputType,
      args: {
        restaurant_id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          RestaurantDetails.findOne(
            { _id: args.restaurant_id },
            (err, restaurantdata) => {
              if (err || !restaurantdata) {
                resolve({
                  errCode: 400,
                  status: "OWNER_PROFILE_DETAILS_FAILURE",
                });
                return;
              }
              let modifiedData = JSON.parse(JSON.stringify(restaurantdata));
              modifiedData.restaurant_id = restaurantdata._id;
              resolve({
                status: "OWNER_PROFILE_DETAILS",
                user: modifiedData,
              });
            }
          );
        });
      },
    },

    getRestaurantDetails: {
      type: getRestaurantDetailsOutputType,
      args: {
        restaurant_id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          RestaurantDetails.findOne(
            { _id: args.restaurant_id },
            (err, restaurantdata) => {
              if (err || !restaurantdata) {
                resolve(null, {
                  errCode: 400,
                  status: "RESTAURANTS_NOT_FOUND",
                });
                return;
              }
              let modifiedData = JSON.parse(JSON.stringify(restaurantdata));
              modifiedData.restaurant_id = restaurantdata._id;
              resolve({
                status: "RESTAURANT_DETAILS",
                restaurentDetails: modifiedData,
              });
              return;
            }
          );
        });
      },
    },

    getSearchRestaurants: {
      type: getSearchRestaurantsOutputType,
      args: {
        search_input: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return new Promise(function (resolve, reject) {
          RestaurantDetails.find(
            { restaurant_city: args.search_input },
            (err, data) => {
              if (err) {
                resolve({
                  errCode: 400,
                  status: "RESTAURANTS_NOT_FOUND",
                });
                return;
              }
              RestaurantDetails.find(
                { restaurant_city: { $ne: args.search_input } },
                (err2, data2) => {
                  if (err2) {
                    resolve({
                      errCode: 400,
                      status: "RESTAURANTS_NOT_FOUND",
                    });
                    return;
                  }
                  const rem_restaurants = addRestaurantIds2(data2);
                  const search_restaurants = addRestaurantIds(data);
                  const all_restos = rem_restaurants.concat(search_restaurants);
                  resolve({
                    status: "ALL_RESTAURANTS",
                    allRestaurants: all_restos,
                  });
                }
              );
            }
          );
        });
      },
    },

    signUpCustomer: {
      type: signUpCustomerOutputType,
      args: {
        name: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        address_line_1: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        zipcode: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        const password = args.password;
        const hashedPassword = md5(password);
        const newUser = new CustomerDetails({
          is_owner: 0,
          name: args.name,
          email_id: args.email,
          password: hashedPassword,
          address_line_1: args.address_line_1,
          city: args.city,
          state: args.state,
          country: args.country,
          zipcode: args.zipcode,
        });
        return new Promise(function (resolve, reject) {
          CustomerDetails.findOne({ email_id: args.email }, (error, result) => {
            if (error) {
              resolve({ errCode: 500 });
              return;
            }
            if (result) {
              resolve({ errCode: 400, status: "USER_EXISTS" });
              return;
            } else {
              newUser.save((err, data) => {
                if (err) {
                  console.log("********************", err);
                  resolve({ errCode: 500, status: "Test" });
                  return;
                } else {
                  let modifiedData = JSON.parse(JSON.stringify(data));
                  modifiedData.customer_id = data._id;
                  const token = jwt.sign({ _id: data }, secret);
                  resolve({
                    status: "USER_ADDED",
                    user: modifiedData,
                    token,
                  });
                }
              });
            }
          });
        });
      },
    },

    signUpOwner: {
      type: signUpOwnerOutputType,
      args: {
        name: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        restaurant_address_line_one: {
          type: GraphQLString,
        },
        restaurant_city: {
          type: GraphQLString,
        },
        restaurant_state: {
          type: GraphQLString,
        },
        restaurant_country: {
          type: GraphQLString,
        },
        restaurant_zipcode: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        const password = args.password;
        const hashedPassword = md5(password);
        const newUser = new RestaurantDetails({
          is_owner: 1,
          name: args.name,
          email_id: args.email,
          password: hashedPassword,
          restaurant_address_line_one: args.restaurant_address_line_one,
          restaurant_city: args.restaurant_city,
          restaurant_state: args.restaurant_state,
          restaurant_country: args.restaurant_country,
          restaurant_zipcode: args.restaurant_zipcode,
          delivery_type: "Both",
        });
        return new Promise(function (resolve, reject) {
          RestaurantDetails.findOne(
            { email_id: args.email },
            (error, result) => {
              if (error) {
                resolve({ errCode: 500 });
                return;
              }
              if (result) {
                resolve({
                  errCode: 400,
                  status: "RESTAURANT_ALREADY_EXISTS",
                });
                return;
              } else {
                newUser.save((err, data) => {
                  if (err) {
                    resolve({ errCode: 500 });
                    return;
                  } else {
                    let modifiedData = JSON.parse(JSON.stringify(data));
                    modifiedData.restaurant_id = data._id;
                    const token = jwt.sign({ _id: data }, secret);
                    resolve({
                      status: "RESTAURANT_ADDED",
                      user: modifiedData,
                      token,
                    });
                  }
                });
              }
            }
          );
        });
      },
    },

    profileCustomer: {
      type: profileCustomerOutputType,
      args: {
        customer_id: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        nick_name: {
          type: GraphQLString,
        },
        phone_num: {
          type: GraphQLString,
        },
        date_of_birth: {
          type: GraphQLString,
        },
        address_line_1: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        zipcode: {
          type: GraphQLString,
        },
        profile_pic_file_path: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        const password = args.password;
        const hashedPassword = md5(password);
        const UserUpdate = {
          $set: {
            is_owner: 0,
            name: args.name,
            email_id: args.email,
            password: hashedPassword,
            nick_name: args.nick_name,
            phone_num: args.phone_num,
            date_of_birth: args.date_of_birth,
            address_line_1: args.address_line_1,
            city: args.city,
            state: args.state,
            country: args.country,
            zipcode: args.zipcode,
            profile_pic_file_path: args.profile_pic_file_path,
          },
        };
        return new Promise(function (resolve, reject) {
          CustomerDetails.updateOne(
            { _id: args.customer_id },
            UserUpdate,
            (error, result) => {
              if (error) {
                console.log("Error ==>", error);
                resolve({
                  errCode: 400,
                  status: "NO_CUSTOMER_ID",
                });
                return;
              }
              CustomerDetails.findOne(
                { _id: args.customer_id },
                (err, customerdata) => {
                  if (err) {
                    resolve({
                      errCode: 400,
                      status: "CANNOT_GET_UPDATED_CUSTOMER_DETAILS",
                    });
                    return;
                  }
                  let modifiedCustomerData = JSON.parse(
                    JSON.stringify(customerdata)
                  );
                  modifiedCustomerData.customer_id = customerdata._id;
                  resolve({
                    status: "CUSTOMER_UPDATED",
                    user: modifiedCustomerData,
                  });
                }
              );
            }
          );
        });
      },
    },

    profileOwner: {
      type: profileOwnerOutputType,
      args: {
        restaurant_id: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        email_id: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        phone_num: {
          type: GraphQLString,
        },

        restaurant_address_line_one: {
          type: GraphQLString,
        },
        restaurant_city: {
          type: GraphQLString,
        },
        restaurant_state: {
          type: GraphQLString,
        },
        restaurant_country: {
          type: GraphQLString,
        },
        restaurant_zipcode: {
          type: GraphQLString,
        },
        image_file_path: {
          type: GraphQLString,
        },
        restaurant_start_time: {
          type: GraphQLString,
        },
        restaurant_end_time: {
          type: GraphQLString,
        },
        delivery_type: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        const password = args.password;
        const hashedPassword = md5(password);
        const RestaurantUpdate = {
          $set: {
            is_owner: 1,
            name: args.name,
            email_id: args.email,
            password: hashedPassword,
            description: args.description,
            phone_num: args.phone_num,
            restaurant_address_line_one: args.restaurant_address_line_one,
            restaurant_city: args.restaurant_city,
            restaurant_state: args.restaurant_state,
            restaurant_country: args.restaurant_country,
            restaurant_zipcode: args.restaurant_zipcode,
            image_file_path: args.image_file_path,
            restaurant_start_time: args.restaurant_start_time,
            restaurant_end_time: args.restaurant_end_time,
            restaurant_week_start: args.restaurant_week_start,
            restaurant_week_end: args.restaurant_week_end,
            delivery_type: args.delivery_type,
          },
        };
        return new Promise(function (resolve, reject) {
          RestaurantDetails.updateOne(
            { _id: args.restaurant_id },
            RestaurantUpdate,
            (error, result) => {
              if (error) {
                resolve({
                  errCode: 400,
                  status: "NO_RESTAURANT_ID",
                });
                return;
              }
              RestaurantDetails.findOne(
                { _id: args.restaurant_id },
                (err, restaurantdata) => {
                  if (err) {
                    resolve({
                      errCode: 400,
                      status: "CANNOT_GET_UPDATED_RESTAURANT_DETAILS",
                    });
                    return;
                  }
                  let modifiedData = JSON.parse(JSON.stringify(restaurantdata));
                  modifiedData.restaurant_id = restaurantdata._id;
                  resolve({
                    status: "RESTAURANT_UPDATED",
                    user: modifiedData,
                  });
                  return;
                }
              );
            }
          );
        });
      },
    },
  },
});

// const Mutation = new GraphQLObjectType({
//   name: "mutation",
//   fields: {
//     customersignup: {
//       type: signupResult,
//       args: {
//         userEmail: {
//           type: GraphQLString,
//         },
//         userPassword: {
//           type: GraphQLString,
//         },
//         firstName: {
//           type: GraphQLString,
//         },
//         lastName: {
//           type: GraphQLString,
//         },
//         userPhone: {
//           type: GraphQLString,
//         },
//         userAddress: {
//           type: GraphQLString,
//         },
//         userZip: {
//           type: GraphQLString,
//         },
//         userImage: {
//           type: GraphQLString,
//         },
//         accountType: {
//           type: GraphQLInt,
//         },
//       },

//       resolve(parent, args) {
//         console.log("args: ", args);
//         console.log("In customer signup");
//         return new Promise(function (resolve, reject) {
//           if (args.accountType != 1) {
//             console.log("enter accountype as 1");
//             reject("error");
//           } else {
//             var new_user = new Users({
//               firstName: args.firstName,
//               lastName: args.lastName,
//               userEmail: args.userEmail,
//               userPassword: args.userPassword,
//               userPhone: args.userPhone,
//               userAddress: args.userAddress,
//               userZip: args.userZip,
//               accountType: args.accountType,
//             });

//             new_user.save(function (err) {
//               if (err) {
//                 console.log(err);
//                 result = {
//                   success: false,
//                   duplicateUser: true,
//                 };
//                 reject(result);
//               } else {
//                 console.log("User saved successfully", new_user);
//                 result = {
//                   success: true,
//                   duplicateUser: false,
//                 };
//                 resolve(result);
//               }
//             });
//           }
//         });
//       },
//     },
//   },
// });

const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation,
});
module.exports = schema;
