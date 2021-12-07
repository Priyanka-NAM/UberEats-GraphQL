// signUpCustomer: {
//   type: signUpCustomerOutputType,
//   args: {
//     name: {
//       type: GraphQLString,
//     },
//     email: {
//       type: GraphQLString,
//     },
//     password: {
//       type: GraphQLString,
//     },
//     address_line_1: {
//       type: GraphQLString,
//     },
//     city: {
//       type: GraphQLString,
//     },
//     state: {
//       type: GraphQLString,
//     },
//     country: {
//       type: GraphQLString,
//     },
//     zipcode: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     const password = args.password;
//     const hashedPassword = md5(password);
//     const newUser = new CustomerDetails({
//       is_owner: 0,
//       name: args.name,
//       email_id: args.email,
//       password: hashedPassword,
//       address_line_1: args.address_line_1,
//       city: args.city,
//       state: args.state,
//       country: args.country,
//       zipcode: args.zipcode,
//     });
//     return new Promise(function (resolve, reject) {
//       CustomerDetails.findOne({ email_id: args.email }, (error, result) => {
//         if (error) {
//           resolve({ errCode: 500 });
//           return;
//         }
//         if (result) {
//           resolve({ errCode: 400, status: "USER_EXISTS" });
//           return;
//         } else {
//           newUser.save((err, data) => {
//             if (err) {
//               console.log("********************", err);
//               resolve({ errCode: 500, status: "Test" });
//               return;
//             } else {
//               let modifiedData = JSON.parse(JSON.stringify(data));
//               modifiedData.customer_id = data._id;
//               const token = jwt.sign({ _id: data }, secret);
//               resolve({
//                 status: "USER_ADDED",
//                 user: modifiedData,
//                 token,
//               });
//             }
//           });
//         }
//       });
//     });
//   },
// },

// signUpOwner: {
//   type: signUpOwnerOutputType,
//   args: {
//     name: {
//       type: GraphQLString,
//     },
//     email: {
//       type: GraphQLString,
//     },
//     password: {
//       type: GraphQLString,
//     },
//     restaurant_address_line_one: {
//       type: GraphQLString,
//     },
//     restaurant_city: {
//       type: GraphQLString,
//     },
//     restaurant_state: {
//       type: GraphQLString,
//     },
//     restaurant_country: {
//       type: GraphQLString,
//     },
//     restaurant_zipcode: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     const password = args.password;
//     const hashedPassword = md5(password);
//     const newUser = new RestaurantDetails({
//       is_owner: 1,
//       name: args.name,
//       email_id: args.email,
//       password: hashedPassword,
//       restaurant_address_line_one: args.restaurant_address_line_one,
//       restaurant_city: args.restaurant_city,
//       restaurant_state: args.restaurant_state,
//       restaurant_country: args.restaurant_country,
//       restaurant_zipcode: args.restaurant_zipcode,
//       delivery_type: "Both",
//     });
//     return new Promise(function (resolve, reject) {
//       RestaurantDetails.findOne(
//         { email_id: args.email },
//         (error, result) => {
//           if (error) {
//             resolve({ errCode: 500 });
//             return;
//           }
//           if (result) {
//             resolve({
//               errCode: 400,
//               status: "RESTAURANT_ALREADY_EXISTS",
//             });
//             return;
//           } else {
//             newUser.save((err, data) => {
//               if (err) {
//                 resolve({ errCode: 500 });
//                 return;
//               } else {
//                 let modifiedData = JSON.parse(JSON.stringify(data));
//                 modifiedData.restaurant_id = data._id;
//                 const token = jwt.sign({ _id: data }, secret);
//                 resolve({
//                   status: "RESTAURANT_ADDED",
//                   user: modifiedData,
//                   token,
//                 });
//               }
//             });
//           }
//         }
//       );
//     });
//   },
// },

// profileCustomer: {
//   type: profileCustomerOutputType,
//   args: {
//     customer_id: {
//       type: GraphQLString,
//     },
//     name: {
//       type: GraphQLString,
//     },
//     email: {
//       type: GraphQLString,
//     },
//     password: {
//       type: GraphQLString,
//     },
//     nick_name: {
//       type: GraphQLString,
//     },
//     phone_num: {
//       type: GraphQLString,
//     },
//     date_of_birth: {
//       type: GraphQLString,
//     },
//     address_line_1: {
//       type: GraphQLString,
//     },
//     city: {
//       type: GraphQLString,
//     },
//     state: {
//       type: GraphQLString,
//     },
//     country: {
//       type: GraphQLString,
//     },
//     zipcode: {
//       type: GraphQLString,
//     },
//     profile_pic_file_path: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     const password = args.password;
//     const hashedPassword = md5(password);
//     const UserUpdate = {
//       $set: {
//         is_owner: 0,
//         name: args.name,
//         email_id: args.email,
//         password: hashedPassword,
//         nick_name: args.nick_name,
//         phone_num: args.phone_num,
//         date_of_birth: args.date_of_birth,
//         address_line_1: args.address_line_1,
//         city: args.city,
//         state: args.state,
//         country: args.country,
//         zipcode: args.zipcode,
//         profile_pic_file_path: args.profile_pic_file_path,
//       },
//     };
//     return new Promise(function (resolve, reject) {
//       CustomerDetails.updateOne(
//         { _id: args.customer_id },
//         UserUpdate,
//         (error, result) => {
//           if (error) {
//             console.log("Error ==>", error);
//             resolve({
//               errCode: 400,
//               status: "NO_CUSTOMER_ID",
//             });
//             return;
//           }
//           CustomerDetails.findOne(
//             { _id: args.customer_id },
//             (err, customerdata) => {
//               if (err) {
//                 resolve({
//                   errCode: 400,
//                   status: "CANNOT_GET_UPDATED_CUSTOMER_DETAILS",
//                 });
//                 return;
//               }
//               let modifiedCustomerData = JSON.parse(
//                 JSON.stringify(customerdata)
//               );
//               modifiedCustomerData.customer_id = customerdata._id;
//               resolve({
//                 status: "CUSTOMER_UPDATED",
//                 user: modifiedCustomerData,
//               });
//             }
//           );
//         }
//       );
//     });
//   },
// },

// profileOwner: {
//   type: profileOwnerOutputType,
//   args: {
//     restaurant_id: {
//       type: GraphQLString,
//     },
//     name: {
//       type: GraphQLString,
//     },
//     email_id: {
//       type: GraphQLString,
//     },
//     password: {
//       type: GraphQLString,
//     },
//     description: {
//       type: GraphQLString,
//     },
//     phone_num: {
//       type: GraphQLString,
//     },

//     restaurant_address_line_one: {
//       type: GraphQLString,
//     },
//     restaurant_city: {
//       type: GraphQLString,
//     },
//     restaurant_state: {
//       type: GraphQLString,
//     },
//     restaurant_country: {
//       type: GraphQLString,
//     },
//     restaurant_zipcode: {
//       type: GraphQLString,
//     },
//     image_file_path: {
//       type: GraphQLString,
//     },
//     restaurant_start_time: {
//       type: GraphQLString,
//     },
//     restaurant_end_time: {
//       type: GraphQLString,
//     },
//     delivery_type: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     const password = args.password;
//     const hashedPassword = md5(password);
//     const RestaurantUpdate = {
//       $set: {
//         is_owner: 1,
//         name: args.name,
//         email_id: args.email,
//         password: hashedPassword,
//         description: args.description,
//         phone_num: args.phone_num,
//         restaurant_address_line_one: args.restaurant_address_line_one,
//         restaurant_city: args.restaurant_city,
//         restaurant_state: args.restaurant_state,
//         restaurant_country: args.restaurant_country,
//         restaurant_zipcode: args.restaurant_zipcode,
//         image_file_path: args.image_file_path,
//         restaurant_start_time: args.restaurant_start_time,
//         restaurant_end_time: args.restaurant_end_time,
//         restaurant_week_start: args.restaurant_week_start,
//         restaurant_week_end: args.restaurant_week_end,
//         delivery_type: args.delivery_type,
//       },
//     };
//     return new Promise(function (resolve, reject) {
//       RestaurantDetails.updateOne(
//         { _id: args.restaurant_id },
//         RestaurantUpdate,
//         (error, result) => {
//           if (error) {
//             resolve({
//               errCode: 400,
//               status: "NO_RESTAURANT_ID",
//             });
//             return;
//           }
//           RestaurantDetails.findOne(
//             { _id: args.restaurant_id },
//             (err, restaurantdata) => {
//               if (err) {
//                 resolve({
//                   errCode: 400,
//                   status: "CANNOT_GET_UPDATED_RESTAURANT_DETAILS",
//                 });
//                 return;
//               }
//               let modifiedData = JSON.parse(JSON.stringify(restaurantdata));
//               modifiedData.restaurant_id = restaurantdata._id;
//               resolve({
//                 status: "RESTAURANT_UPDATED",
//                 user: modifiedData,
//               });
//               return;
//             }
//           );
//         }
//       );
//     });
//   },
// },

// ordersNewOrderAdd: {
//   type: ordersNewOrderAddOutputType,
//   args: {
//     restaurentId: {
//       type: GraphQLString,
//     },
//     customerName: {
//       type: GraphQLString,
//     },
//     restaurant_name: {
//       type: GraphQLString,
//     },
//     restaurant_city: {
//       type: GraphQLString,
//     },
//     restaurant_image: {
//       type: GraphQLString,
//     },
//     customerId: {
//       type: GraphQLString,
//     },
//     order_status: {
//       type: GraphQLString,
//     },
//     delivery_status: {
//       type: GraphQLString,
//     },
//     order_total: {
//       type: GraphQLFloat,
//     },
//     tax: {
//       type: GraphQLString,
//     },
//     delivery_cost: {
//       type: GraphQLString,
//     },
//     gratitude: {
//       type: GraphQLString,
//     },
//     sub_total: {
//       type: GraphQLFloat,
//     },
//     order_delivery_type: {
//       type: GraphQLString,
//     },
//     order_address_line_1: {
//       type: GraphQLString,
//     },
//     order_city: {
//       type: GraphQLString,
//     },
//     order_state: {
//       type: GraphQLString,
//     },
//     order_country: {
//       type: GraphQLString,
//     },
//     order_zipcode: {
//       type: GraphQLString,
//     },
//     // cart_items: {
//     //   // type: new GraphQLList(cart_itemsType),
//     // },
//     // dishes: {
//     //   type: GraphQLString,
//     // },
//     notes: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     let dishes = [];
//     const cart_items = args.cart_items;
//     for (let i = 0; i < cart_items.length; i += 1) {
//       dishes.push({
//         dish_id: cart_items[i].dish_id,
//         dish_name: cart_items[i].title,
//         quantity: cart_items[i].quantity,
//         price: cart_items[i].price,
//       });
//     }
//     const newOrder = new OrderDetails({
//       restaurant_id: args.restaurentId,
//       customer_name: args.customerName,
//       restaurant_name: args.restaurant_name,
//       restaurant_city: args.restaurant_city,
//       restaurant_image_file_path: args.restaurant_image,
//       customer_id: args.customerId,
//       order_status: args.order_status,
//       delivery_status: args.delivery_status,
//       order_total: args.order_total,
//       tax: args.tax,
//       delivery_cost: args.delivery_cost,
//       gratitude: args.gratitude,
//       sub_total: args.sub_total,
//       order_delivery_type: args.order_delivery_type,
//       order_address_line_1: args.order_address_line_1,
//       order_city: args.order_city,
//       order_state: args.order_state,
//       order_country: args.order_country,
//       order_zipcode: args.order_zipcode,
//       dishes: dishes,
//       notes: args.notes,
//     });
//     return new Promise(function (resolve, reject) {
//       newOrder.save((err, data) => {
//         if (err) {
//           resolve({
//             errCode: 400,
//             status: "ORDER_CREATION_FAILED",
//           });
//           return;
//         } else {
//           OrderDetails.find(
//             { customer_id: args.customerId },
//             (finderr, allorders) => {
//               if (finderr) {
//                 resolve({
//                   errCode: 400,
//                   status: "CUSTOMER_ID_NULL",
//                 });
//                 return;
//               }
//               resolve({
//                 status: "ORDER_CREATED",
//                 orders: addOrderIds(allorders),
//               });
//               return;
//             }
//           );
//         }
//       });
//     });
//   },
// },

// ordersNewOrderUpdate: {
//   type: ordersNewOrderUpdateOutputType,
//   args: {
//     order_status: {
//       type: GraphQLString,
//     },
//     delivery_status: {
//       type: GraphQLString,
//     },
//     restaurant_id: {
//       type: GraphQLString,
//     },
//     order_id: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     const OrderUpdate = {
//       $set: {
//         order_status: args.order_status,
//         delivery_status: args.delivery_status,
//         restaurant_id: args.restaurant_id,
//         order_id: args.order_id,
//       },
//     };
//     return new Promise(function (resolve, reject) {
//       OrderDetails.updateOne(
//         { _id: args.order_id },
//         OrderUpdate,
//         (error, result) => {
//           if (error) {
//             resolve({
//               errCode: 400,
//               status: "NO_ORDER_ID",
//             });
//             return;
//           }
//           OrderDetails.findOne({ _id: args.order_id }, (err, data) => {
//             if (err) {
//               resolve({
//                 errCode: 400,
//                 status: "NO_RESTAURANT_ID",
//               });
//               return;
//             }
//             OrderDetails.find(
//               { restaurant_id: args.restaurant_id, order_status: "Active" },
//               (finderr, allorders) => {
//                 if (finderr) {
//                   resolve({
//                     errCode: 400,
//                     status: "CUSTOMER_ID_NULL",
//                   });
//                   return;
//                 }
//                 resolve({
//                   status: "UPDATED_ORDER",
//                   orders: addOrderIds(allorders),
//                 });
//               }
//             );
//           });
//         }
//       );
//     });
//   },
// },

// dishesAddDish: {
//   type: dishesAddDishOutputType,
//   args: {
//     restaurentId: {
//       type: GraphQLString,
//     },
//     dishdescription: {
//       type: GraphQLString,
//     },
//     dishname: {
//       type: GraphQLString,
//     },
//     imageFilePath: {
//       type: GraphQLString,
//     },
//     dishcategory: {
//       type: GraphQLString,
//     },
//     dishtype: {
//       type: GraphQLString,
//     },
//     ingredients: {
//       type: GraphQLString,
//     },
//     price: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     const newDish = new Dishes({
//       restaurant_id: args.restaurentId,
//       name: args.dishname,
//       description: args.dishdescription,
//       image_file_path: args.imageFilePath,
//       category: args.dishcategory,
//       dish_type: args.dishtype,
//       ingredients: args.ingredients,
//       price: parseFloat(args.price),
//       isActive: "true",
//     });
//     return new Promise(function (resolve, reject) {
//       Dishes.findOne(
//         {
//           restaurant_id: args.restaurentId,
//           name: args.dishname,
//           isActive: "true",
//         },
//         (error, result) => {
//           if (error) {
//             resolve({
//               errCode: 400,
//               status: "Internal server error",
//             });
//             return;
//           }
//           if (result) {
//             resolve({
//               errCode: 400,
//               status: "DISH_EXISTS",
//             });
//             return;
//           } else {
//             newDish.save((err, data) => {
//               if (err) {
//                 resolve({
//                   errCode: 400,
//                   status: "DISH_COULDNOT_BE_ADDED",
//                 });
//                 return;
//               } else {
//                 Dishes.find(
//                   { restaurant_id: args.restaurentId, isActive: "true" },
//                   (finderr, dishes) => {
//                     if (finderr) {
//                       resolve({
//                         errCode: 400,
//                         status: "RESTAURANT_ID_NULL",
//                       });
//                       return;
//                     }
//                     resolve({
//                       status: "DISH_ADDED",
//                       allDishes: addDishesIds(dishes),
//                     });
//                     return;
//                   }
//                 );
//               }
//             });
//           }
//         }
//       );
//     });
//   },
// },

// dishesUpdateDish: {
//   type: dishesUpdateDishOutputType,
//   args: {
//     dishId: {
//       type: GraphQLString,
//     },
//     restaurentId: {
//       type: GraphQLString,
//     },
//     dishname: {
//       type: GraphQLString,
//     },
//     dishdescription: {
//       type: GraphQLString,
//     },
//     imageFilePath: {
//       type: GraphQLString,
//     },
//     dishcategory: {
//       type: GraphQLString,
//     },
//     dishtype: {
//       type: GraphQLString,
//     },
//     ingredients: {
//       type: GraphQLString,
//     },
//     price: {
//       type: GraphQLString,
//     },
//     isActive: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     const DishUpdate = {
//       $set: {
//         restaurant_id: args.restaurentId,
//         name: args.dishname,
//         description: args.dishdescription,
//         image_file_path: args.imageFilePath,
//         category: args.dishcategory,
//         dish_type: args.dishtype,
//         price: parseFloat(args.price),
//         ingredients: args.ingredients,
//         isActive: args.isActive,
//       },
//     };
//     console.log("Inside Dish Update Backend", args);
//     return new Promise(function (resolve, reject) {
//       Dishes.updateOne(
//         { _id: args.dishId, restaurant_id: args.restaurentId },
//         DishUpdate,
//         (error, result) => {
//           if (error) {
//             resolve({
//               errCode: 400,
//               status: "NO_DISH_ID",
//             });
//             return;
//           }
//           // Dishes.findOne({ _id: args.dishId }, (err, dishdata) => {
//           //   if (err) {
//           //     resolve({
//           //       errCode: 400,
//           //       status: "CANNOT_GET_UPDATED_DISH_DETAILS",
//           //     });
//           //     return;
//           //   }
//           Dishes.find(
//             { restaurant_id: args.restaurentId, isActive: "true" },
//             (finderr, dishes) => {
//               if (finderr) {
//                 resolve({
//                   errCode: 400,
//                   status: "RESTAURANT_ID_NULL",
//                 });
//                 return;
//               }
//               resolve({
//                 status: "DISH_UPDATED",
//                 allDishes: addDishesIds(dishes),
//               });
//               return;
//             }
//           );
//           // });
//         }
//       );
//     });
//   },
// },

// fileUplaod: {
//   type: fileUplaodOutputType,
//   args: {
//     fileInput: {
//       type: GraphQLString,
//     },
//   },
//   resolve(parent, args) {
//     // async (req, res, next) => {
//     upload(args.fileInput, res, (err) => {
//       if (!err) {
//         if (args.fileInput.file && args.fileInput.file.path) {
//           res.end(req.file.path);
//         }
//       } else {
//         console.log("Error!");
//       }
//     });
//     // };
//   },
// },
