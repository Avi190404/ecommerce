export type Product = {
  id: string;
  name: string;
  category: "Electronics" | "Footwear" | "Computing" | "Gaming" | "Photography";
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  rating: number;
  images: string[]; // Updated to array of strings
};

export const sampleProducts: Product[] = [
  {
    id: "PROD-101",
    name: "Sony WH-1000XM5 Black",
    category: "Electronics",
    price: 349.99,
    stock: 12,
    status: "In Stock",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a"
    ]
  },
  {
    id: "PROD-102",
    name: "Nike Air Jordan 1 Retro",
    category: "Footwear",
    price: 170.0,
    stock: 5,
    status: "Low Stock",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
      "https://images.unsplash.com/photo-1605348532760-6753d2c41324",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
    ]
  },
  {
    id: "PROD-103",
    name: "MacBook Pro M3 14-inch",
    category: "Computing",
    price: 1599.0,
    stock: 0,
    status: "Out of Stock",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1611186871348-b1ec696e5237",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    ]
  },
  {
    id: "PROD-104",
    name: "PS5 DualSense Edge Controller",
    category: "Gaming",
    price: 199.99,
    stock: 25,
    status: "In Stock",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e",
      "https://images.unsplash.com/photo-1593118247619-e2d6f056869e",
      "https://images.unsplash.com/photo-1622239431513-30b2066f27d1"
    ]
  },
  {
    id: "PROD-105",
    name: "Fujifilm X-T5 Mirrorless",
    category: "Photography",
    price: 1699.0,
    stock: 3,
    status: "Low Stock",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      "https://images.unsplash.com/photo-1510127847039-4b0099ef435c",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553"
    ]
  },
  {
    id: "PROD-106",
    name: "Logitech MX Master 3S",
    category: "Computing",
    price: 99.0,
    stock: 40,
    status: "In Stock",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d0058",
      "https://images.unsplash.com/photo-1634403665481-74948d815f03",
      "https://images.unsplash.com/photo-1605833521204-6bd022fc4092",
      "https://images.unsplash.com/photo-1541140532154-b024d715b915"
    ]
  },
  {
    id: "PROD-107",
    name: "Keychron Q1 Mechanical Keyboard",
    category: "Computing",
    price: 169.0,
    stock: 8,
    status: "In Stock",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212",
      "https://images.unsplash.com/photo-1618384881928-83101d400291",
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f"
    ]
  },
  {
    id: "PROD-108",
    name: "Adidas Ultraboost Light",
    category: "Footwear",
    price: 190.0,
    stock: 15,
    status: "In Stock",
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
    ]
  },
  {
    id: "PROD-109",
    name: "Nintendo Switch OLED",
    category: "Gaming",
    price: 349.99,
    stock: 2,
    status: "Low Stock",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1578303372704-14f2436099ac",
      "https://images.unsplash.com/photo-1600080972464-8e5f3580211e",
      "https://images.unsplash.com/photo-1595164502740-4ef88776817b",
      "https://images.unsplash.com/photo-1605898960764-75660c84bc22"
    ]
  },
  {
    id: "PROD-110",
    name: "Canon EOS R5 Body",
    category: "Photography",
    price: 3899.0,
    stock: 0,
    status: "Out of Stock",
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9",
      "https://images.unsplash.com/photo-1514996937319-344454492b37"
    ]
  },
  {
    id: "PROD-111",
    name: "Marshall Stanmore III",
    category: "Electronics",
    price: 379.0,
    stock: 10,
    status: "In Stock",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531bdf9915e",
      "https://images.unsplash.com/photo-1544650030-3c51ad35730d",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a"
    ]
  },
  {
    id: "PROD-112",
    name: "Yeezy Boost 350 V2",
    category: "Footwear",
    price: 230.0,
    stock: 1,
    status: "Low Stock",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa"
    ]
  },
  {
    id: "PROD-113",
    name: "Dell UltraSharp 27 4K",
    category: "Computing",
    price: 729.0,
    stock: 20,
    status: "In Stock",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d0058",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
      "https://images.unsplash.com/photo-1587202399161-30ca9dd3ea92",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    ]
  },
  {
    id: "PROD-114",
    name: "Razer DeathAdder V3 Pro",
    category: "Gaming",
    price: 149.99,
    stock: 35,
    status: "In Stock",
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d0058",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
    ]
  },
  {
    id: "PROD-115",
    name: "Leica Q3 Camera",
    category: "Photography",
    price: 5995.0,
    stock: 2,
    status: "Low Stock",
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1495121553079-4c61bbbc19ef",
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9",
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553",
      "https://images.unsplash.com/photo-1510127847039-4b0099ef435c"
    ]
  },
  {
    id: "PROD-116",
    name: "Apple Watch Ultra 2",
    category: "Electronics",
    price: 799.0,
    stock: 18,
    status: "In Stock",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "https://images.unsplash.com/photo-1508685096489-7aac296839c6",
      "https://images.unsplash.com/photo-1434493907317-a46b5bc78344",
      "https://images.unsplash.com/photo-1461141346587-763ab02bdbc9"
    ]
  },
  {
    id: "PROD-117",
    name: "Vans Old Skool Classic",
    category: "Footwear",
    price: 60.0,
    stock: 50,
    status: "In Stock",
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      "https://images.unsplash.com/photo-1560761139-cb6c4d9efee1",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6"
    ]
  },
  {
    id: "PROD-118",
    name: "iPad Pro M2 12.9-inch",
    category: "Computing",
    price: 1099.0,
    stock: 0,
    status: "Out of Stock",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764",
      "https://images.unsplash.com/photo-1585515320310-259814833e62",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ]
  },
  {
    id: "PROD-119",
    name: "Xbox Series X",
    category: "Gaming",
    price: 499.0,
    stock: 14,
    status: "In Stock",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
      "https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff",
      "https://images.unsplash.com/photo-1593118247619-e2d6f056869e",
      "https://images.unsplash.com/photo-1622239431513-30b2066f27d1"
    ]
  },
  {
    id: "PROD-120",
    name: "DJI Mavic 3 Pro",
    category: "Photography",
    price: 2199.0,
    stock: 6,
    status: "In Stock",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
      "https://images.unsplash.com/photo-1473968512447-ac47514620bc",
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9",
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9"
    ]
  }
];