create table category (
    category_id int auto_increment,
    category_name varchar(100) not null,
    category_image varchar(200) not null,
    category_icon varchar(200) not null,
    is_enable boolean,
    primary key (category_id)
)

create table brand (
    brand_id int auto_increment,
    brand_name varchar(100) not null,
    brand_image varchar(100) not null,
    is_enable boolean,
    primary key (brand_id)
)

create table banners (
    banner_id int auto_increment,
    banner_name varchar(200) not null,
    banner_image varchar(200) not null,
    banner_location varchar(200) not null,
    banner_heading varchar(200),
    banner_subheading varchar(200),
    banner_cta varchar(200),
    banner_cta_text varchar(200),
    is_enable boolean,
    primary key (banner_id)
)

create table products (
    product_id int auto_increment,
    product_name varchar(250) not null,
    product_price varchar(250) not null,
    product_image varchar(250) not null,
    product_description varchar(250) not null,
    product_qty int not null,
    category_id int not null,
    brand_id int not null,
    is_enable boolean
    primary key (product_id)
)

create table product_rating (
    product_rating_id int auto_increment,
    product_id int not null,
    user_id int not null,
    rating int not null,
    feedback varchar(500),
    primary key (product_rating_id)
)

create table users (
    user_id int auto_increment
    user_name varchar(200) not null,
    user_email varchar(200) not null,
    user_phone_no varchar(200) not null,
    user_address_id int,
    is_active boolean,
    primary key (user_id)
)

create table users_address (
    user_address_id int auto_increment
    user_address_line_1 varchar(200) not null,
    user_address_line_2 varchar(200)
    user_address_city varchar(200) not null,
    user_address_state varchar(200) not null,
    user_address_country varchar(200) not null,
    user_address_zipcode varchar(200) not null,
    primary key (user_address_id)
)

create table orders(
    order_id int auto_increment,
    user_id int not null,
    product_id json,
    time varchar(100),
    date varchar(100),
    total_price int not null,
    discount int,
    coupon_code varchar(100),
    shipping_charge int,
    primary key (order_id)
)

create table wishlist (
    wishlist_id int not null,
    user_id int not null,
    product_id int not null,
    primary key (wishlist_id)
)

create table frequently_asked_question (
    faq_id int auto_increment,
    faq_question varchar(500) not null,
    faq_answer varchar(1000) not null,
    is_enable boolean,
    primary key (faq_id)
)

create table faq_like (
    faq_like_id int auto_increment,
    faq_id int not null,
    user_id int not null,
    primary key (faq_like_id)
)
