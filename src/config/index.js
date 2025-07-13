
import { CupSoda, SquarePlay , Heart, Flame , Book , Dice6  } from "lucide-react";

export const categoriesWithIcon = [
  { id: "soft-toys", label: "Soft Toys", icon: CupSoda },
  { id: "musical-toys", label: "Musical Toys", icon: SquarePlay  },
  { id: "best-seller", label: "Best Seller", icon: Heart },
  { id: "new-arrival", label: "New Arrival", icon: Flame  },
  { id: "learning-toys", label: "Learning Toys", icon: Book  },
];

export const brandsWithIcon = [
  { id: "satishsea", label: "Satishsea", icon: Dice6  },
  { id: "snehalsea", label: "Snehalsea", icon: Dice6  },
  { id: "rushsea", label: "Rushsea", icon: Dice6  },
  { id: "ankitasea", label: "Anikitasea", icon: Dice6  },
  { id: "purnavsea", label: "Purnavsea", icon: Dice6  },
];


export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "smart-collars", label: "Smart Collars" },
      { id: "feeding-tech", label: "Feeding Tech" },
      { id: "wellness-products", label: "Wellness Products" },
      { id: "grooming-tech", label: "Grooming Tech" },
      { id: "tracking-devices", label: "Tracking Devices" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "fitbark", label: "FitBark" },
      { id: "tractive", label: "Tractive" },
      { id: "petcube", label: "Petcube" },
      { id: "whistle", label: "Whistle" },
      { id: "furbo", label: "Furbo" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems  = [
  { id: 2, label: "Products", path: "/shop/products" },
  // { id: 3, label: "About", path: "/shop/about" },
  { id: 4, label: "Wishlist", path: "/shop/wishlist" },
];

export const categoryOptionsMap = {
  "smart-collars": "Smart Collars",
  "feeding-tech": "Feeding Tech",
  "wellness-products": "Wellness Products",
  "grooming-tech": "Grooming Tech",
  "tracking-devices": "Tracking Devices",
};

export const brandOptionsMap = {
  fitbark: "FitBark",
  tractive: "Tractive",
  petcube: "Petcube",
  whistle: "Whistle",
  furbo: "Furbo",
};

export const filterOptions = {
  category: [
    { id: "soft-toys", label: "Soft Toys" },
    { id: "musical-toys", label: "Musical Toys" },
    { id: "best-seller", label: "Best Seller" },
    { id: "new-arrival", label: "New Arrival" },
    { id: "learning-toys", label: "Learning Toys" },
  ],
  brand: [
    { id: "satishsea", label: "Satishsea" },
    { id: "snehalsea", label: "Snehalsea" },
    { id: "rushsea", label: "Rushsea" },
    { id: "ankitasea", label: "Anikitasea" },
    { id: "purnavsea", label: "Purnavsea" },
  ],
};


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Name",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
