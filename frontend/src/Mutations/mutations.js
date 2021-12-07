import { gql } from "apollo-boost";

const LOGIN_QUERY = gql`
  mutation LoginQuery($email: String, $password: String) {
    login(email: $email, password: $password) {
      status
      errCode
      token
      user {
        is_owner
        name
        email_id
        password
        date_of_birth
        address_line_1
        city
        state
        country
        zipcode
        nick_name
        profile_pic_file_path
        customer_id
        restaurant_id
        description
        restaurant_address_line_one
        restaurant_city
        restaurant_state
        restaurant_country
        restaurant_zipcode
        image_file_path
        phone_num
        restaurant_start_time
        restaurant_end_time
        restaurant_week_start
        restaurant_week_end
        national_brand
        delivery_type
      }
    }
  }
`;

const SIGN_UP_CUSTOMER = gql`
  mutation signUpCustomer(
    $name: String
    $email: String
    $password: String
    $address_line_1: String
    $city: String
    $state: String
    $country: String
    $zipcode: String
  ) {
    signUpCustomer(
      name: $name
      email: $email
      password: $password
      address_line_1: $address_line_1
      city: $city
      state: $state
      country: $country
      zipcode: $zipcode
    ) {
      status
      token
      errCode
      user {
        customer_id
        is_owner
        name
        email_id
        password
        address_line_1
        city
        state
        country
        zipcode
        date_of_birth
        nick_name
        phone_num
        profile_pic_file_path
      }
    }
  }
`;

const UPDATE_CUSTOMER = gql`
  mutation profileCustomer(
    $name: String
    $email: String
    $password: String
    $address_line_1: String
    $city: String
    $state: String
    $country: String
    $zipcode: String
    $date_of_birth: String
    $nick_name: String
    $phone_num: String
    $profile_pic_file_path: String
    $customer_id: String
  ) {
    profileCustomer(
      name: $name
      email: $email
      password: $password
      address_line_1: $address_line_1
      city: $city
      state: $state
      country: $country
      zipcode: $zipcode
      date_of_birth: $date_of_birth
      nick_name: $nick_name
      phone_num: $phone_num
      profile_pic_file_path: $profile_pic_file_path
      customer_id: $customer_id
    ) {
      status
      errCode
      user {
        customer_id
        is_owner
        name
        email_id
        password
        address_line_1
        city
        state
        country
        zipcode
        date_of_birth
        nick_name
        phone_num
        profile_pic_file_path
      }
    }
  }
`;

const SIGN_UP_OWNER = gql`
  mutation signUpOwner(
    $name: String
    $email: String
    $password: String
    $restaurant_address_line_one: String
    $restaurant_city: String
    $restaurant_state: String
    $restaurant_country: String
    $restaurant_zipcode: String
  ) {
    signUpOwner(
      name: $name
      email: $email
      password: $password
      restaurant_address_line_one: $restaurant_address_line_one
      restaurant_city: $restaurant_city
      restaurant_state: $restaurant_state
      restaurant_country: $restaurant_country
      restaurant_zipcode: $restaurant_zipcode
    ) {
      status
      token
      errCode
      user {
        is_owner
        restaurant_id
        name
        email_id
        password
        description
        restaurant_address_line_one
        restaurant_city
        restaurant_state
        restaurant_country
        restaurant_zipcode
        restaurant_zipcode
        image_file_path
        restaurant_start_time
        restaurant_end_time
        delivery_type
      }
    }
  }
`;

const UPDATE_OWNER = gql`
  mutation profileOwner(
    $restaurant_id: String
    $name: String
    $email: String
    $password: String
    $description: String
    $phone_num: String
    $restaurant_address_line_one: String
    $restaurant_city: String
    $restaurant_state: String
    $restaurant_country: String
    $restaurant_zipcode: String
    $image_file_path: String
    $restaurant_start_time: String
    $restaurant_end_time: String
    $delivery_type: String
  ) {
    profileOwner(
      restaurant_id: $restaurant_id
      name: $name
      email_id: $email
      password: $password
      description: $description
      phone_num: $phone_num
      restaurant_address_line_one: $restaurant_address_line_one
      restaurant_city: $restaurant_city
      restaurant_state: $restaurant_state
      restaurant_country: $restaurant_country
      restaurant_zipcode: $restaurant_zipcode
      image_file_path: $image_file_path
      restaurant_start_time: $restaurant_start_time
      restaurant_end_time: $restaurant_end_time
      delivery_type: $delivery_type
    ) {
      status
      errCode
      user {
        is_owner
        restaurant_id
        name
        email_id
        password
        description
        restaurant_address_line_one
        restaurant_city
        restaurant_state
        restaurant_country
        restaurant_zipcode
        restaurant_zipcode
        image_file_path
        restaurant_start_time
        restaurant_end_time
        delivery_type
      }
    }
  }
`;

const ADD_DISH = gql`
  mutation dishesAddDish(
    $dishname: String
    $dishdescription: String
    $restaurentId: String
    $price: String
    $ingredients: String
    $dishcategory: String
    $imageFilePath: String
    $dishtype: String
  ) {
    dishesAddDish(
      dishname: $dishname
      dishdescription: $dishdescription
      dishtype: $dishtype
      restaurentId: $restaurentId
      imageFilePath: $imageFilePath
      price: $price
      ingredients: $ingredients
      dishcategory: $dishcategory
    ) {
      status
      errCode
      allDishes {
        name
        dish_id
        description
        ingredients
        price
        image_file_path
        category
        dish_type
        cuisine_type
        dish_start_time
        dish_end_time
        isActive
        restaurant_id
      }
    }
  }
`;

const UPDATE_DISH = gql`
  mutation dishesUpdateDish(
    $dishname: String
    $dishdescription: String
    $restaurentId: String
    $price: String
    $ingredients: String
    $dishcategory: String
    $imageFilePath: String
    $dishtype: String
    $dishId: String
    $isActive: String
  ) {
    dishesUpdateDish(
      dishId: $dishId
      dishname: $dishname
      dishdescription: $dishdescription
      dishtype: $dishtype
      restaurentId: $restaurentId
      imageFilePath: $imageFilePath
      price: $price
      ingredients: $ingredients
      dishcategory: $dishcategory
      isActive: $isActive
    ) {
      status
      errCode
      allDishes {
        name
        dish_id
        description
        ingredients
        price
        image_file_path
        category
        dish_type
        cuisine_type
        dish_start_time
        dish_end_time
        isActive
        restaurant_id
      }
    }
  }
`;

const NEW_ORDERS_UPDATE = gql`
  mutation ordersNewOrderUpdate(
    $order_status: String
    $restaurant_id: String
    $order_id: String
    $delivery_status: String
  ) {
    ordersNewOrderUpdate(
      order_status: $order_status
      restaurant_id: $restaurant_id
      order_id: $order_id
      delivery_status: $delivery_status
    ) {
      status
      errCode
      orders {
        order_id
        order_status
        delivery_status
        order_total
        tax
        delivery_cost
        gratitude
        sub_total
        order_delivery_type
        order_address_line_1
        order_city
        order_state
        order_country
        order_zipcode
        notes
        restaurant_name
        restaurant_image_file_path
        restaurant_city
        customer_name
        customer_id
        restaurant_id
        dishes {
          dish_id
          dish_name
          quantity
          price
        }
      }
    }
  }
`;

const CUSTOMER_ORDER_PLACED = gql`
  mutation ordersNewOrderAdd(
    $restaurentId: String
    $restaurant_name: String
    $restaurant_city: String
    $restaurant_image: String
    $customer_id: String
    $customerName: String
    $order_status: String
    $delivery_status: String
    $order_total: String
    $tax: String
    $delivery_cost: Float
    $gratitude: Float
    $sub_total: String
    $order_delivery_type: String
    $order_address_line_1: String
    $order_city: String
    $order_state: String
    $order_country: String
    $order_zipcode: String
    $cart_items: [CartItemsType]
  ) {
    ordersNewOrderAdd(
      customerName: $customerName
      restaurentId: $restaurentId
      restaurant_name: $restaurant_name
      restaurant_city: $restaurant_city
      restaurant_image: $restaurant_image
      customerId: $customer_id
      order_status: $order_status
      sub_total: $sub_total
      delivery_status: $delivery_status
      order_total: $order_total
      tax: $tax
      delivery_cost: $delivery_cost
      gratitude: $gratitude
      order_delivery_type: $order_delivery_type
      order_address_line_1: $order_address_line_1
      order_city: $order_city
      order_state: $order_state
      order_country: $order_country
      order_zipcode: $order_zipcode
      cart_items: $cart_items
    ) {
      status
      errCode
      orders {
        order_id
        order_status
        delivery_status
        order_total
        tax
        delivery_cost
        gratitude
        sub_total
        order_delivery_type
        order_address_line_1
        order_city
        order_state
        order_country
        order_zipcode
        notes
        restaurant_name
        restaurant_image_file_path
        restaurant_city
        customer_name
        customer_id
        restaurant_id
        create_time
        dishes {
          dish_id
          dish_name
          quantity
          price
        }
      }
    }
  }
`;

export {
  SIGN_UP_CUSTOMER,
  UPDATE_CUSTOMER,
  SIGN_UP_OWNER,
  UPDATE_OWNER,
  ADD_DISH,
  UPDATE_DISH,
  NEW_ORDERS_UPDATE,
  CUSTOMER_ORDER_PLACED,
  LOGIN_QUERY,
};
