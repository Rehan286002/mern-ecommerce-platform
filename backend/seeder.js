const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });
const Product = require('./models/Product');

const products = [

  // ─── OUT OF STOCK — existing categories (random out of stock) ──
  {
    name: 'Apple iPhone 15 Pro (Space Black)',
    price: 134999,
    description: 'iPhone 15 Pro in Space Black with A17 Pro chip, titanium frame, 48MP camera. Currently out of stock due to high demand.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
    brand: 'Apple', category: 'Smartphones', countInStock: 0, rating: 4.9, numReviews: 412, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Sony PlayStation 5 Digital Edition',
    price: 44999,
    description: 'PS5 Digital Edition — disc-free next-gen gaming with ultra-high speed SSD. Sold out — restock coming soon.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
    brand: 'Sony', category: 'Gaming', countInStock: 0, rating: 4.9, numReviews: 634, seller: 'Amazon'
  },
  {
    name: 'Apple AirPods Max Silver',
    price: 59999,
    description: 'AirPods Max over-ear headphones in Silver with Active Noise Cancellation, Spatial Audio. Currently out of stock.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    brand: 'Apple', category: 'Audio', countInStock: 0, rating: 4.8, numReviews: 287, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Nvidia RTX 4090 Founders Edition',
    price: 159999,
    description: 'Nvidia GeForce RTX 4090 Founders Edition GPU with 24GB GDDR6X. Extremely limited — out of stock.',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
    brand: 'Nvidia', category: 'Computers', countInStock: 0, rating: 5.0, numReviews: 189, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'DJI Mavic 3 Pro Drone',
    price: 189999,
    description: 'DJI Mavic 3 Pro with triple Hasselblad cameras, 43-min flight time, omnidirectional sensing. Out of stock.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
    brand: 'DJI', category: 'Cameras', countInStock: 0, rating: 4.9, numReviews: 97, seller: 'Amazon'
  },
  {
    name: 'Samsung Galaxy Z Flip 5',
    price: 99999,
    description: 'Samsung Galaxy Z Flip 5 foldable with Snapdragon 8 Gen 2, Flex Window, 3.4-inch cover display. Out of stock.',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500',
    brand: 'Samsung', category: 'Smartphones', countInStock: 0, rating: 4.6, numReviews: 143, seller: 'Amazon'
  },
  {
    name: 'Apple Mac Pro M2 Ultra Tower',
    price: 699999,
    description: 'Apple Mac Pro M2 Ultra Tower — the most powerful Mac ever with 192GB unified memory. Out of stock.',
    image: 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?w=500',
    brand: 'Apple', category: 'Computers', countInStock: 0, rating: 5.0, numReviews: 23, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Nintendo Switch 2',
    price: 49999,
    description: 'Nintendo Switch 2 with larger 8-inch display, magnetic Joy-Con, 4K TV mode. Pre-order sold out.',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
    brand: 'Nintendo', category: 'Gaming', countInStock: 0, rating: 4.9, numReviews: 312, seller: 'Amazon'
  },

  // ─── SPORTS & FITNESS ──────────────────────────────────────
  {
    name: 'Yonex Astrox 99 Pro Badminton Racket',
    price: 14999,
    description: 'Professional badminton racket with Carbon Nanotube technology, stiff flex for attacking players. Used by world champions.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
    brand: 'Yonex', category: 'Sports & Fitness', countInStock: 25, rating: 4.8, numReviews: 156, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Nike Air Zoom Pegasus 41',
    price: 11999,
    description: 'Nike Air Zoom Pegasus 41 running shoes with React foam, dual Zoom Air units, engineered mesh upper.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    brand: 'Nike', category: 'Sports & Fitness', countInStock: 40, rating: 4.7, numReviews: 289, seller: 'Amazon'
  },
  {
    name: 'Decathlon Domyos 900 Treadmill',
    price: 49999,
    description: 'Decathlon Domyos treadmill with 20km/h max speed, 15% incline, foldable design, 160kg capacity.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    brand: 'Decathlon', category: 'Sports & Fitness', countInStock: 8, rating: 4.5, numReviews: 67, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Adidas Predator Elite Football Boots',
    price: 24999,
    description: 'Adidas Predator Elite FG boots with Controlframe outsole, laceless design, Zone Skin technology.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    brand: 'Adidas', category: 'Sports & Fitness', countInStock: 30, rating: 4.6, numReviews: 134, seller: 'Amazon'
  },
  {
    name: 'Whoop 4.0 Fitness Tracker',
    price: 19999,
    description: 'Whoop 4.0 continuous health monitor tracking HRV, recovery, sleep, strain. No screen, pure data.',
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500',
    brand: 'Whoop', category: 'Sports & Fitness', countInStock: 15, rating: 4.5, numReviews: 98, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Bowflex SelectTech 552 Dumbbells',
    price: 34999,
    description: 'Bowflex SelectTech 552 adjustable dumbbells — 5 to 52.5 lbs, replaces 15 sets of weights.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    brand: 'Bowflex', category: 'Sports & Fitness', countInStock: 12, rating: 4.8, numReviews: 203, seller: 'Amazon'
  },
  {
    name: 'Speedo Fastskin LZR Pure Intent',
    price: 12999,
    description: 'Speedo competition swimsuit with LZR fabric, compression bonding, world record broken in this suit.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500',
    brand: 'Speedo', category: 'Sports & Fitness', countInStock: 20, rating: 4.7, numReviews: 45, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Wilson Pro Staff RF97 Tennis Racket',
    price: 18999,
    description: 'Roger Federer signature Wilson Pro Staff RF97 Autograph tennis racket with Braided Graphite.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500',
    brand: 'Wilson', category: 'Sports & Fitness', countInStock: 18, rating: 4.8, numReviews: 87, seller: 'Amazon'
  },
  {
    name: 'Garmin Forerunner 965 GPS Watch',
    price: 54999,
    description: 'Garmin Forerunner 965 running smartwatch with AMOLED display, training readiness, race predictor.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    brand: 'Garmin', category: 'Sports & Fitness', countInStock: 10, rating: 4.8, numReviews: 112, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Cult.fit Pro Yoga Mat',
    price: 2999,
    description: 'Premium 6mm thick non-slip yoga mat with alignment lines, carry strap, sweat-resistant surface.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    brand: 'Cult.fit', category: 'Sports & Fitness', countInStock: 60, rating: 4.4, numReviews: 234, seller: 'Amazon'
  },
  {
    name: 'Peloton Bike+',
    price: 199999,
    description: 'Peloton Bike+ with auto-resistance, 23.8-inch rotating touchscreen, Apple GymKit, live classes.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    brand: 'Peloton', category: 'Sports & Fitness', countInStock: 0, rating: 4.7, numReviews: 78, seller: 'Rehan Pvt Ltd.'
  },

  // ─── BOOKS & STATIONERY ────────────────────────────────────
  {
    name: 'Atomic Habits — James Clear',
    price: 499,
    description: 'The #1 New York Times bestseller. Tiny changes, remarkable results. A proven framework for improving every day.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    brand: 'Penguin', category: 'Books & Stationery', countInStock: 100, rating: 4.9, numReviews: 1204, seller: 'Amazon'
  },
  {
    name: 'The Pragmatic Programmer',
    price: 1299,
    description: 'Your journey to mastery — 20th Anniversary Edition. Must-read for every software developer.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
    brand: 'Addison-Wesley', category: 'Books & Stationery', countInStock: 45, rating: 4.8, numReviews: 567, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Clean Code — Robert C. Martin',
    price: 999,
    description: 'A handbook of agile software craftsmanship by Uncle Bob. Essential reading for professional developers.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    brand: 'Prentice Hall', category: 'Books & Stationery', countInStock: 60, rating: 4.7, numReviews: 432, seller: 'Amazon'
  },
  {
    name: 'Leuchtturm1917 A5 Notebook',
    price: 1499,
    description: 'Premium hardcover notebook with 251 numbered pages, table of contents, 2 bookmarks, ink-proof paper.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500',
    brand: 'Leuchtturm1917', category: 'Books & Stationery', countInStock: 80, rating: 4.8, numReviews: 345, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Lamy Safari Fountain Pen',
    price: 2999,
    description: 'Iconic Lamy Safari fountain pen with ergonomic grip, stainless steel nib. Available in multiple colors.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500',
    brand: 'Lamy', category: 'Books & Stationery', countInStock: 35, rating: 4.7, numReviews: 189, seller: 'Amazon'
  },
  {
    name: 'You Don\'t Know JS — Kyle Simpson',
    price: 2499,
    description: 'Complete 6-book series — deep dive into JavaScript core mechanisms. Essential for JS developers.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
    brand: "O'Reilly", category: 'Books & Stationery', countInStock: 28, rating: 4.8, numReviews: 312, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Moleskine Art Sketch Pad',
    price: 1199,
    description: 'Moleskine A4 sketch pad with 48 acid-free pages, ideal for pencil, ink, light markers and watercolors.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500',
    brand: 'Moleskine', category: 'Books & Stationery', countInStock: 50, rating: 4.6, numReviews: 134, seller: 'Amazon'
  },
  {
    name: 'Staedtler Mars Professional Drawing Set',
    price: 3499,
    description: 'Professional 12-piece technical drawing set with Mars Micro mechanical pencils, compasses, rulers.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500',
    brand: 'Staedtler', category: 'Books & Stationery', countInStock: 22, rating: 4.7, numReviews: 98, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Design Patterns — Gang of Four',
    price: 1799,
    description: 'Elements of Reusable Object-Oriented Software. The classic software engineering bible by GoF.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    brand: 'Addison-Wesley', category: 'Books & Stationery', countInStock: 33, rating: 4.6, numReviews: 267, seller: 'Amazon'
  },
  {
    name: 'Post-it Super Sticky Notes Pack',
    price: 699,
    description: 'Post-it Super Sticky Notes — 90 sheets per pad, 10 pads, bright neon colors, 2x sticking power.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500',
    brand: '3M', category: 'Books & Stationery', countInStock: 150, rating: 4.5, numReviews: 445, seller: 'Rehan Pvt Ltd.'
  },

  // ─── CLOTHING & FASHION ────────────────────────────────────
  {
    name: 'Uniqlo Ultra Light Down Jacket',
    price: 5999,
    description: 'Uniqlo Ultra Light Down Jacket — 90% down fill, packable to pocket size, wind and water resistant.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    brand: 'Uniqlo', category: 'Clothing & Fashion', countInStock: 35, rating: 4.7, numReviews: 312, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Levi\'s 511 Slim Fit Jeans',
    price: 3999,
    description: 'Levi\'s 511 Slim Fit in authentic stretch denim. Sits below waist, slim through thigh and leg opening.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    brand: "Levi's", category: 'Clothing & Fashion', countInStock: 50, rating: 4.6, numReviews: 445, seller: 'Amazon'
  },
  {
    name: 'Nike Dri-FIT Training T-Shirt',
    price: 2499,
    description: 'Nike Dri-FIT technology moves sweat away from skin for quicker evaporation, keeping you dry and comfortable.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    brand: 'Nike', category: 'Clothing & Fashion', countInStock: 80, rating: 4.5, numReviews: 267, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'H&M Oversized Hoodie',
    price: 2999,
    description: 'H&M oversized cotton-blend hoodie with kangaroo pocket, adjustable drawstring hood. Relaxed fit.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500',
    brand: 'H&M', category: 'Clothing & Fashion', countInStock: 60, rating: 4.4, numReviews: 189, seller: 'Amazon'
  },
  {
    name: 'Zara Premium Wool Coat',
    price: 8999,
    description: 'Zara premium wool blend coat with notched lapels, button front, welt pockets. Classic winter essential.',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
    brand: 'Zara', category: 'Clothing & Fashion', countInStock: 20, rating: 4.6, numReviews: 134, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Adidas Originals Trefoil Hoodie',
    price: 4499,
    description: 'Adidas Originals iconic Trefoil hoodie in French terry cotton with ribbed cuffs and hem.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500',
    brand: 'Adidas', category: 'Clothing & Fashion', countInStock: 45, rating: 4.5, numReviews: 223, seller: 'Amazon'
  },
  {
    name: 'Bombay Shirt Company Oxford Shirt',
    price: 3499,
    description: 'Bombay Shirt Company slim-fit Oxford shirt in premium 100% cotton. Perfect for office and casual wear.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
    brand: 'Bombay Shirt Co.', category: 'Clothing & Fashion', countInStock: 30, rating: 4.7, numReviews: 98, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Puma RS-X³ Puzzle Sneakers',
    price: 7999,
    description: 'Puma RS-X³ Puzzle chunky sneakers with RS foam midsole, mesh and synthetic upper, retro running style.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    brand: 'Puma', category: 'Clothing & Fashion', countInStock: 25, rating: 4.4, numReviews: 167, seller: 'Amazon'
  },
  {
    name: 'Ray-Ban Aviator Classic Sunglasses',
    price: 9999,
    description: 'Ray-Ban Aviator Classic with gold frame, G-15 glass lenses, UV400 protection. The original aviator.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    brand: 'Ray-Ban', category: 'Clothing & Fashion', countInStock: 40, rating: 4.8, numReviews: 312, seller: 'Rehan Pvt Ltd.'
  },
  {
    name: 'Fossil Gen 6 Smartwatch',
    price: 19999,
    description: 'Fossil Gen 6 smartwatch with Wear OS, Snapdragon 4100+, SpO2 sensor, 1.28-inch AMOLED display.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    brand: 'Fossil', category: 'Clothing & Fashion', countInStock: 0, rating: 4.5, numReviews: 145, seller: 'Amazon'
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    await Product.insertMany(products);
    console.log(`${products.length} new products seeded successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Seeder error:', error.message);
    process.exit(1);
  }
};

seedProducts();