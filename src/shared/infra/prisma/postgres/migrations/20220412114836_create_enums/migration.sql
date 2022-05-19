-- CreateEnum
CREATE TYPE "GroupsNameEnum" AS ENUM ('role-super-admin', 'role-admin', 'role-user', 'role-client');

-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('awaiting', 'processing', 'processed', 'canceled');

-- CreateEnum
CREATE TYPE "ReviewsStatusEnum" AS ENUM ('accredited', 'disapproved', 'awaiting analysis');

-- CreateEnum
CREATE TYPE "StockActionEnum" AS ENUM ('acquisition', 'devolution', 'sale', 'others');

-- CreateEnum
CREATE TYPE "StocksStatusEnum" AS ENUM ('stockIn', 'stockOut');
