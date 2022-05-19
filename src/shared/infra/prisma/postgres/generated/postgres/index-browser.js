
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.14.0
 * Query Engine version: 2b0c12756921c891fec4f68d9444e18c7d5d4a6a
 */
Prisma.prismaVersion = {
  client: "3.14.0",
  engine: "2b0c12756921c891fec4f68d9444e18c7d5d4a6a"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.PersonScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  email: 'email',
  cpf: 'cpf',
  rg: 'rg',
  rgss: 'rgss',
  birth_date: 'birth_date',
  status: 'status',
  privacy: 'privacy',
  avatar: 'avatar',
  phone_id: 'phone_id',
  address_id: 'address_id'
});

exports.Prisma.AddressPersonScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  number: 'number',
  street: 'street',
  complement: 'complement',
  zip_code: 'zip_code',
  city: 'city',
  state: 'state',
  neighborhood: 'neighborhood',
  person_id: 'person_id'
});

exports.Prisma.PhonePersonScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  phone: 'phone',
  person_id: 'person_id'
});

exports.Prisma.GroupScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  description: 'description'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  password: 'password',
  is_verified: 'is_verified',
  person_id: 'person_id'
});

exports.Prisma.UserGroupScalarFieldEnum = makeEnum({
  created_at: 'created_at',
  updated_at: 'updated_at',
  user_id: 'user_id',
  group_id: 'group_id'
});

exports.Prisma.RefresheTokenScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  refresh_token: 'refresh_token',
  device: 'device',
  expires_date: 'expires_date',
  user_id: 'user_id'
});

exports.Prisma.CategoryScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  type: 'type',
  slug: 'slug',
  description: 'description',
  photo: 'photo'
});

exports.Prisma.PoliticScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  reading_time: 'reading_time',
  slug: 'slug',
  description: 'description'
});

exports.Prisma.SubCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name'
});

exports.Prisma.OrderScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  total: 'total',
  freight: 'freight',
  canceled_at: 'canceled_at',
  status: 'status',
  user_id: 'user_id'
});

exports.Prisma.ProductScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  sku: 'sku',
  bar_code: 'bar_code',
  other: 'other',
  canceled_at: 'canceled_at',
  status: 'status',
  status_freight: 'status_freight',
  status_product: 'status_product',
  price_id: 'price_id',
  description_id: 'description_id',
  subcategory_id: 'subcategory_id',
  product_info_id: 'product_info_id'
});

exports.Prisma.CategoryProductScalarFieldEnum = makeEnum({
  created_at: 'created_at',
  updated_at: 'updated_at',
  category_id: 'category_id',
  product_id: 'product_id'
});

exports.Prisma.PhotoScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  priority: 'priority',
  product_id: 'product_id'
});

exports.Prisma.PriceScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  price: 'price',
  price_promotion: 'price_promotion',
  product_id: 'product_id',
  user_id: 'user_id'
});

exports.Prisma.VideoScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  slug: 'slug',
  product_id: 'product_id'
});

exports.Prisma.ReviewScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  comment: 'comment',
  status: 'status',
  product_id: 'product_id',
  author_id: 'author_id'
});

exports.Prisma.CommentScalarFieldEnum = makeEnum({
  id: 'id',
  text: 'text'
});

exports.Prisma.DescriptionScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  description: 'description'
});

exports.Prisma.BannerScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  type: 'type',
  status: 'status',
  priority: 'priority'
});

exports.Prisma.StockScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  stock: 'stock',
  status: 'status',
  action: 'action',
  product_id: 'product_id'
});

exports.Prisma.OrderProductScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  subtotal: 'subtotal',
  quantity: 'quantity',
  status: 'status',
  order_id: 'order_id',
  product_id: 'product_id',
  user_id: 'user_id',
  price_id: 'price_id'
});

exports.Prisma.TransactionScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  transaction_id: 'transaction_id',
  status: 'status',
  brand: 'brand',
  authorization_code: 'authorization_code',
  authorized_amount: 'authorized_amount',
  tid: 'tid',
  installments: 'installments',
  order_id: 'order_id'
});

exports.Prisma.ProductInfoScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  price: 'price',
  price_promotion: 'price_promotion',
  freight: 'freight',
  link: 'link',
  stock: 'stock',
  company: 'company',
  currency: 'currency',
  user_id: 'user_id'
});

exports.Prisma.ForgotTokenScalarFieldEnum = makeEnum({
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  token: 'token',
  code: 'code',
  expires_date: 'expires_date',
  user_id: 'user_id'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.NullableJsonNullValueInput = makeEnum({
  DbNull: 'DbNull',
  JsonNull: 'JsonNull'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.JsonNullValueFilter = makeEnum({
  DbNull: 'DbNull',
  JsonNull: 'JsonNull',
  AnyNull: 'AnyNull'
});
exports.TypeCategoryEnum = makeEnum({
  MENU: 'MENU',
  SLIDE: 'SLIDE'
});

exports.StatusOrderEnum = makeEnum({
  AWAITING: 'AWAITING',
  PROCESSING: 'PROCESSING',
  PROCESSED: 'PROCESSED',
  CANCELED: 'CANCELED'
});

exports.ReviewsStatusEnum = makeEnum({
  ACCREDITED: 'ACCREDITED',
  DISAPPROVED: 'DISAPPROVED',
  AWAITING_ANALYSIS: 'AWAITING_ANALYSIS'
});

exports.StocksStatusEnum = makeEnum({
  STOCK_IN: 'STOCK_IN',
  STOCK_OUT: 'STOCK_OUT'
});

exports.StockActionEnum = makeEnum({
  ACQUISITION: 'ACQUISITION',
  DEVOLUTION: 'DEVOLUTION',
  SALE: 'SALE',
  OTHERS: 'OTHERS'
});

exports.Prisma.ModelName = makeEnum({
  Person: 'Person',
  AddressPerson: 'AddressPerson',
  PhonePerson: 'PhonePerson',
  Group: 'Group',
  User: 'User',
  UserGroup: 'UserGroup',
  RefresheToken: 'RefresheToken',
  Category: 'Category',
  Politic: 'Politic',
  SubCategory: 'SubCategory',
  Order: 'Order',
  Product: 'Product',
  CategoryProduct: 'CategoryProduct',
  Photo: 'Photo',
  Price: 'Price',
  Video: 'Video',
  Review: 'Review',
  Comment: 'Comment',
  Description: 'Description',
  Banner: 'Banner',
  Stock: 'Stock',
  OrderProduct: 'OrderProduct',
  Transaction: 'Transaction',
  ProductInfo: 'ProductInfo',
  ForgotToken: 'ForgotToken'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
