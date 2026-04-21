
import { Product, Branch, Category, Order } from './types';

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', iconName: 'Apple', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf' },
  { id: 'c2', name: 'Meats', slug: 'meats', iconName: 'Beef', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f' },
  { id: 'c3', name: 'Frozen Foods', slug: 'frozen-foods', iconName: 'Snowflake', image: 'https://images.unsplash.com/photo-1551025119-923f0539c0dc' },
  { id: 'c4', name: 'Wines & Spirits', slug: 'wines-spirits', iconName: 'Wine', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3' },
  { id: 'c5', name: 'Furniture', slug: 'furniture', iconName: 'Armchair', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc' },
  { id: 'c6', name: 'Electronics', slug: 'electronics', iconName: 'Tv', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03' },
  { id: 'c7', name: 'Utensils & Ornaments', slug: 'utensils-ornaments', iconName: 'Utensils', image: 'https://images.unsplash.com/photo-1584269613118-117eef98c8c6' },
  { id: 'c8', name: 'Homecare', slug: 'homecare', iconName: 'Home', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17' },
  { id: 'c9', name: 'Baby Products', slug: 'baby-products', iconName: 'Baby', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4' },
  { id: 'c10', name: 'Gym & Sports', slug: 'gym-sports', iconName: 'Dumbbell', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48' },
  { id: 'c11', name: 'Health & Beauty', slug: 'health-beauty', iconName: 'Sparkles', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348' },
  { id: 'c12', name: 'Bakery', slug: 'bakery', iconName: 'Croissant', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
];

export const PRODUCTS: Product[] = [
  // --- FRUITS & VEGETABLES (10) ---
  { id: 'fv1', name: 'Red Tomatoes', price: 800, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea', description: 'Fresh local tomatoes.', weight: '1 kg', brand: 'Local Farm', inStock: true, rating: 4.5 },
  { id: 'fv2', name: 'Green Bananas (Matoke)', price: 400, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224', description: 'Cooking bananas.', weight: '1 kg', brand: 'Local Farm', inStock: true },
  { id: 'fv3', name: 'Red Onions', price: 900, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb', description: 'Dry red onions.', weight: '1 kg', brand: 'Local Farm', inStock: true },
  { id: 'fv4', name: 'Avocado', price: 500, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1523049673856-38866f8c679f', description: 'Ripe butter avocado.', weight: '1 pc', brand: 'Local Farm', inStock: true },
  { id: 'fv5', name: 'Fresh Spinach', price: 300, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb', description: 'Green leafy spinach.', weight: 'Bunch', brand: 'Local Farm', inStock: true },
  { id: 'fv6', name: 'Carrots', price: 600, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37', description: 'Crunchy orange carrots.', weight: '1 kg', brand: 'Local Farm', inStock: true },
  { id: 'fv7', name: 'Irish Potatoes', price: 450, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82a6b6dc', description: 'Kinigi potatoes.', weight: '1 kg', brand: 'Local Farm', inStock: true },
  { id: 'fv8', name: 'Mangoes', price: 1500, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078', description: 'Sweet ripe mangoes.', weight: '1 kg', brand: 'Imported', inStock: true },
  { id: 'fv9', name: 'Watermelon', price: 3000, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38', description: 'Large juicy watermelon.', weight: '1 pc', brand: 'Local Farm', inStock: true },
  { id: 'fv10', name: 'Pineapple', price: 1200, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba', description: 'Sweet pineapple.', weight: '1 pc', brand: 'Local Farm', inStock: true },

  // --- MEATS (10) ---
  { id: 'mt1', name: 'Beef Steak', price: 4500, category: 'Meats', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e', description: 'Fresh beef steak cut.', weight: '1 kg', brand: 'Simba Butchery', inStock: true },
  { id: 'mt2', name: 'Whole Chicken', price: 6000, category: 'Meats', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781', description: 'Local free-range chicken.', weight: '1.2 kg', brand: 'Simba Butchery', inStock: true },
  { id: 'mt3', name: 'Goat Meat', price: 5500, category: 'Meats', image: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9', description: 'Tender goat meat cubes.', weight: '1 kg', brand: 'Simba Butchery', inStock: true },
  { id: 'mt4', name: 'Minced Meat', price: 4000, category: 'Meats', image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678', description: 'Lean minced beef.', weight: '1 kg', brand: 'Simba Butchery', inStock: true },
  { id: 'mt5', name: 'Beef Sausages', price: 3500, category: 'Meats', image: 'https://images.unsplash.com/photo-1595486859345-d86b9762df2f', description: 'Spiced beef sausages.', weight: '500g', brand: 'Farmers Choice', inStock: true },
  { id: 'mt6', name: 'Chicken Breast', price: 5000, category: 'Meats', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', description: 'Boneless chicken breast.', weight: '1 kg', brand: 'Simba Butchery', inStock: true },
  { id: 'mt7', name: 'Pork Chops', price: 5500, category: 'Meats', image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55', description: 'Fresh pork chops.', weight: '1 kg', brand: 'Simba Butchery', inStock: true },
  { id: 'mt8', name: 'Fish Fillet (Tilapia)', price: 6500, category: 'Meats', image: 'https://images.unsplash.com/photo-1511446777649-16e788eb5ebf', description: 'Frozen tilapia fillet.', weight: '1 kg', brand: 'Local Fishery', inStock: true },
  { id: 'mt9', name: 'Liver', price: 3500, category: 'Meats', image: 'https://images.unsplash.com/photo-1543340904-991f3751a30f', description: 'Fresh beef liver.', weight: '1 kg', brand: 'Simba Butchery', inStock: true },
  { id: 'mt10', name: 'Lamb Chops', price: 7000, category: 'Meats', image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea616', description: 'Premium lamb chops.', weight: '1 kg', brand: 'Simba Butchery', inStock: true },

  // --- FROZEN FOODS (10) ---
  { id: 'ff1', name: 'Frozen Green Peas', price: 2500, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1551025119-923f0539c0dc', description: 'Sweet green peas.', weight: '1 kg', brand: 'Simba Frozen', inStock: true },
  { id: 'ff2', name: 'Mixed Vegetables', price: 2200, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1627993079937-299cb2182054', description: 'Carrots, peas, corn mix.', weight: '1 kg', brand: 'Simba Frozen', inStock: true },
  { id: 'ff3', name: 'Vanilla Ice Cream', price: 4500, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f', description: 'Creamy vanilla tub.', weight: '2L', brand: 'Inyange', inStock: true },
  { id: 'ff4', name: 'Frozen French Fries', price: 3000, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1630384060421-a4323ce5663d', description: 'Ready to fry chips.', weight: '1 kg', brand: 'McCain', inStock: true },
  { id: 'ff5', name: 'Fish Fingers', price: 5000, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a45ddfa', description: 'Breaded fish fingers.', weight: '400g', brand: 'Sea Harvest', inStock: true },
  { id: 'ff6', name: 'Chicken Nuggets', price: 4800, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1562967960-f55430ed51f8', description: 'Crispy chicken nuggets.', weight: '400g', brand: 'Simba Frozen', inStock: true },
  { id: 'ff7', name: 'Frozen Corn', price: 2500, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1522066524318-7f287431e7c5', description: 'Sweet corn kernels.', weight: '1 kg', brand: 'Simba Frozen', inStock: true },
  { id: 'ff8', name: 'Strawberry Ice Cream', price: 4500, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f', description: 'Strawberry flavored.', weight: '2L', brand: 'Inyange', inStock: true },
  { id: 'ff9', name: 'Frozen Pizza (Margherita)', price: 6500, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', description: 'Ready to bake pizza.', weight: '300g', brand: 'Dr Oetker', inStock: true },
  { id: 'ff10', name: 'Frozen Berries Mix', price: 7000, category: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1519330377309-d083e3634399', description: 'Mixed berries for smoothies.', weight: '500g', brand: 'Imported', inStock: true },

  // --- WINES & SPIRITS (10) ---
  { id: 'ws1', name: 'Red Wine (Merlot)', price: 12000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480', description: 'Smooth red wine.', weight: '750ml', brand: 'Nederburg', inStock: true },
  { id: 'ws2', name: 'White Wine (Sauvignon)', price: 11000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1559070169-a3077159ee16', description: 'Crisp dry white.', weight: '750ml', brand: 'Four Cousins', inStock: true },
  { id: 'ws3', name: 'Whiskey Black Label', price: 45000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8', description: 'Aged scotch whiskey.', weight: '750ml', brand: 'Johnnie Walker', inStock: true },
  { id: 'ws4', name: 'Vodka', price: 25000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1610444695958-84dc2c444005', description: 'Premium vodka.', weight: '750ml', brand: 'Absolut', inStock: true },
  { id: 'ws5', name: 'Heineken 6-Pack', price: 6000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1634509747262-d4b97d268571', description: 'Lager beer cans.', weight: '6x330ml', brand: 'Heineken', inStock: true },
  { id: 'ws6', name: 'Amarula Cream', price: 18000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7', description: 'Cream liqueur.', weight: '750ml', brand: 'Amarula', inStock: true },
  { id: 'ws7', name: 'Gin', price: 22000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1597516391490-642139049a46', description: 'Dry London Gin.', weight: '750ml', brand: 'Gordons', inStock: true },
  { id: 'ws8', name: 'Rosé Wine', price: 13000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1559070135-f259b369bf87', description: 'Sweet rosé.', weight: '750ml', brand: 'Robertson', inStock: true },
  { id: 'ws9', name: 'Rum', price: 20000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb', description: 'Spiced gold rum.', weight: '750ml', brand: 'Captain Morgan', inStock: true },
  { id: 'ws10', name: 'Champagne', price: 65000, category: 'Wines & Spirits', image: 'https://images.unsplash.com/photo-1598155523122-38423ae4d6c3', description: 'French sparkling wine.', weight: '750ml', brand: 'Moet', inStock: true },

  // --- FURNITURE (10) ---
  { id: 'fu1', name: 'Office Chair', price: 85000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1', description: 'Ergonomic mesh chair.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu2', name: 'Study Desk', price: 65000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd', description: 'Wooden study table.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu3', name: 'Coffee Table', price: 45000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d', description: 'Glass top coffee table.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu4', name: 'Bookshelf', price: 55000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156', description: '4-tier wooden shelf.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu5', name: 'Dining Chair', price: 25000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c', description: 'Modern dining chair.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu6', name: 'Bean Bag', price: 35000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c', description: 'Comfortable large bean bag.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu7', name: 'Shoe Rack', price: 15000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1595515106967-143fa5d6e507', description: 'Plastic shoe organizer.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu8', name: 'TV Stand', price: 75000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1601055903647-87ac96ec1e29', description: 'Modern TV unit.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu9', name: 'Bedside Lamp', price: 18000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1507473888900-52e1ad14596d', description: 'Warm light table lamp.', weight: '1 pc', brand: 'Simba Home', inStock: true },
  { id: 'fu10', name: 'Plastic Stool', price: 5000, category: 'Furniture', image: 'https://images.unsplash.com/photo-1503602642458-232111445840', description: 'Durable plastic stool.', weight: '1 pc', brand: 'Local', inStock: true },

  // --- ELECTRONICS (10) ---
  { id: 'el1', name: 'Electric Kettle', price: 25000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1594213114663-d94db9b1712a', description: 'Stainless steel kettle.', weight: '1.7L', brand: 'Philips', inStock: true },
  { id: 'el2', name: 'Smart TV 43"', price: 350000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1', description: 'Full HD Smart LED TV.', weight: '43 inch', brand: 'Samsung', inStock: true },
  { id: 'el3', name: 'Microwave Oven', price: 120000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078', description: 'Digital microwave.', weight: '20L', brand: 'LG', inStock: true },
  { id: 'el4', name: 'Blender', price: 35000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1570222094114-28a9d8896aca', description: 'Smoothie blender.', weight: '1.5L', brand: 'Kenwood', inStock: true },
  { id: 'el5', name: 'Iron Box', price: 18000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce', description: 'Steam iron.', weight: '1 pc', brand: 'Philips', inStock: true },
  { id: 'el6', name: 'Toaster', price: 30000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1583525287315-998845b40449', description: '2-slice toaster.', weight: '1 pc', brand: 'Sayona', inStock: true },
  { id: 'el7', name: 'Extension Cable', price: 8000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1558230554-4f8102143431', description: '4-way extension.', weight: '1 pc', brand: 'PowerKing', inStock: true },
  { id: 'el8', name: 'Headphones', price: 25000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', description: 'Over-ear headphones.', weight: '1 pc', brand: 'Sony', inStock: true },
  { id: 'el9', name: 'Rice Cooker', price: 45000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b', description: 'Automatic rice cooker.', weight: '1.8L', brand: 'Sayona', inStock: true },
  { id: 'el10', name: 'Desk Fan', price: 15000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1565191771141-80798e21350e', description: 'Small desk fan.', weight: '1 pc', brand: 'Generic', inStock: true },

  // --- UTENSILS & ORNAMENTS (10) ---
  { id: 'uo1', name: 'Dinner Plate Set', price: 25000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1603198642728-66779ee898e0', description: '6-piece ceramic plates.', weight: 'Set', brand: 'Luminarc', inStock: true },
  { id: 'uo2', name: 'Non-Stick Pan', price: 15000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff', description: 'Frying pan 26cm.', weight: '1 pc', brand: 'Tefal', inStock: true },
  { id: 'uo3', name: 'Kitchen Knife Set', price: 12000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1593618998160-e34015e67502', description: 'Set of 5 knives.', weight: 'Set', brand: 'Tramontina', inStock: true },
  { id: 'uo4', name: 'Water Glasses', price: 8000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', description: 'Set of 6 tumblers.', weight: 'Set', brand: 'Luminarc', inStock: true },
  { id: 'uo5', name: 'Cooking Pot', price: 20000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330', description: 'Aluminum cooking pot.', weight: 'Large', brand: 'Local', inStock: true },
  { id: 'uo6', name: 'Cutlery Set', price: 10000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1606760596677-2c93361e2df9', description: 'Spoons, forks, knives.', weight: '24 pcs', brand: 'Tramontina', inStock: true },
  { id: 'uo7', name: 'Coffee Mugs', price: 6000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d', description: 'Set of 4 mugs.', weight: 'Set', brand: 'Ceramic', inStock: true },
  { id: 'uo8', name: 'Food Container Set', price: 15000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1592393863640-c750e50f78c9', description: 'Storage tupperware.', weight: 'Set', brand: 'KenPoly', inStock: true },
  { id: 'uo9', name: 'Thermos Flask', price: 12000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', description: 'Keep tea hot.', weight: '1L', brand: 'Nice', inStock: true },
  { id: 'uo10', name: 'Flower Vase', price: 18000, category: 'Utensils & Ornaments', image: 'https://images.unsplash.com/photo-1581783342308-f792ca11df53', description: 'Ceramic flower vase.', weight: '1 pc', brand: 'Decor', inStock: true },

  // --- HOMECARE (10) ---
  { id: 'hc1', name: 'Laundry Detergent', price: 6500, category: 'Homecare', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce', description: 'Washing powder.', weight: '2kg', brand: 'Omo', inStock: true },
  { id: 'hc2', name: 'Dishwashing Liquid', price: 2000, category: 'Homecare', image: 'https://images.unsplash.com/photo-1634547986064-a62da4252a1d', description: 'Lemon fresh.', weight: '750ml', brand: 'Morning Fresh', inStock: true },
  { id: 'hc3', name: 'Toilet Cleaner', price: 2500, category: 'Homecare', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a', description: 'Kills 99% germs.', weight: '750ml', brand: 'Harpic', inStock: true },
  { id: 'hc4', name: 'Air Freshener', price: 3000, category: 'Homecare', image: 'https://images.unsplash.com/photo-1601614741634-b219154f24f4', description: 'Lavender scent.', weight: '300ml', brand: 'Glade', inStock: true },
  { id: 'hc5', name: 'Toilet Paper', price: 4000, category: 'Homecare', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611f', description: 'Soft 2-ply tissues.', weight: 'Pack of 10', brand: 'Velvex', inStock: true },
  { id: 'hc6', name: 'Broom & Dustpan', price: 5000, category: 'Homecare', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348', description: 'Sweeping set.', weight: 'Set', brand: 'Local', inStock: true },
  { id: 'hc7', name: 'Floor Cleaner', price: 3500, category: 'Homecare', image: 'https://images.unsplash.com/photo-1626245942442-f38b43f9a941', description: 'Multi-surface cleaner.', weight: '1.5L', brand: 'Dettol', inStock: true },
  { id: 'hc8', name: 'Garbage Bags', price: 2000, category: 'Homecare', image: 'https://images.unsplash.com/photo-1611080841961-0730bd708689', description: 'Large bin liners.', weight: 'Roll', brand: 'Tukuza', inStock: true },
  { id: 'hc9', name: 'Sponges', price: 1000, category: 'Homecare', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f', description: 'Scrubbing sponges.', weight: 'Pack of 3', brand: 'Scotch', inStock: true },
  { id: 'hc10', name: 'Glass Cleaner', price: 2800, category: 'Homecare', image: 'https://images.unsplash.com/photo-1628126857189-22a36b9e5927', description: 'Streak-free shine.', weight: '500ml', brand: 'Windolene', inStock: true },

  // --- BABY PRODUCTS (10) ---
  { id: 'bp1', name: 'Baby Diapers', price: 12000, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df4', description: 'Size 4 diapers.', weight: 'Pack', brand: 'Pampers', inStock: true },
  { id: 'bp2', name: 'Baby Wipes', price: 2500, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1593368297071-88f029094e99', description: 'Sensitive skin wipes.', weight: 'Pack', brand: 'Pampers', inStock: true },
  { id: 'bp3', name: 'Baby Powder', price: 3000, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4', description: 'Soft powder.', weight: '200g', brand: 'Johnsons', inStock: true },
  { id: 'bp4', name: 'Baby Oil', price: 3500, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1556228720-1957be83f360', description: 'Moisturizing oil.', weight: '200ml', brand: 'Johnsons', inStock: true },
  { id: 'bp5', name: 'Infant Formula', price: 15000, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1618389035652-329b35234563', description: 'Stage 1 milk.', weight: '400g', brand: 'Nan', inStock: true },
  { id: 'bp6', name: 'Feeding Bottle', price: 5000, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1596489439169-3176662e5b7c', description: 'BPA free bottle.', weight: '250ml', brand: 'Avent', inStock: true },
  { id: 'bp7', name: 'Baby Lotion', price: 4000, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b', description: 'Gentle lotion.', weight: '200ml', brand: 'Nivea Baby', inStock: true },
  { id: 'bp8', name: 'Baby Soap', price: 1500, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec', description: 'Mild bar soap.', weight: '100g', brand: 'Dettol', inStock: true },
  { id: 'bp9', name: 'Diaper Cream', price: 6000, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', description: 'Rash protection.', weight: '100g', brand: 'Sudocrem', inStock: true },
  { id: 'bp10', name: 'Baby Shampoo', price: 4500, category: 'Baby Products', image: 'https://images.unsplash.com/photo-1556228720-1957be83f360', description: 'No tears shampoo.', weight: '200ml', brand: 'Johnsons', inStock: true },

  // --- GYM & SPORTS (10) ---
  { id: 'gs1', name: 'Yoga Mat', price: 15000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f', description: 'Non-slip mat.', weight: '1 pc', brand: 'Generic', inStock: true },
  { id: 'gs2', name: 'Dumbbells Set', price: 35000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1632168593466-932d43cb8d2c', description: '2x 5kg dumbbells.', weight: '10kg', brand: 'Generic', inStock: true },
  { id: 'gs3', name: 'Football', price: 12000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab', description: 'Standard size 5 ball.', weight: '1 pc', brand: 'Nike', inStock: true },
  { id: 'gs4', name: 'Jump Rope', price: 5000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1595567958448-692797e84126', description: 'Speed rope.', weight: '1 pc', brand: 'Generic', inStock: true },
  { id: 'gs5', name: 'Water Bottle', price: 8000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1602143407151-cd11122348c3', description: 'Sports bottle.', weight: '750ml', brand: 'Generic', inStock: true },
  { id: 'gs6', name: 'Resistance Bands', price: 10000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc', description: 'Set of 3 bands.', weight: 'Set', brand: 'Generic', inStock: true },
  { id: 'gs7', name: 'Tennis Racket', price: 45000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6', description: 'Beginner racket.', weight: '1 pc', brand: 'Wilson', inStock: true },
  { id: 'gs8', name: 'Gym Gloves', price: 6000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61', description: 'Training gloves.', weight: 'Pair', brand: 'Generic', inStock: true },
  { id: 'gs9', name: 'Foam Roller', price: 12000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30', description: 'Muscle relief.', weight: '1 pc', brand: 'Generic', inStock: true },
  { id: 'gs10', name: 'Basketball', price: 15000, category: 'Gym & Sports', image: 'https://images.unsplash.com/photo-1519861531473-92002639313a', description: 'Outdoor basketball.', weight: '1 pc', brand: 'Spalding', inStock: true },

  // --- HEALTH & BEAUTY (10) ---
  { id: 'hb1', name: 'Body Lotion', price: 4500, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8', description: 'Cocoa butter.', weight: '400ml', brand: 'Nivea', inStock: true },
  { id: 'hb2', name: 'Shampoo', price: 3500, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d', description: 'Hair cleanser.', weight: '400ml', brand: 'Head & Shoulders', inStock: true },
  { id: 'hb3', name: 'Toothpaste', price: 1500, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1559599189-fe84dea4eb79', description: 'Cavity protection.', weight: '100ml', brand: 'Colgate', inStock: true },
  { id: 'hb4', name: 'Deodorant Spray', price: 3000, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1616789916327-7c70c1e8d98d', description: '48h fresh.', weight: '150ml', brand: 'Rexona', inStock: true },
  { id: 'hb5', name: 'Face Wash', price: 4000, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1556228720-1957be83f360', description: 'Daily scrub.', weight: '150ml', brand: 'Garnier', inStock: true },
  { id: 'hb6', name: 'Bar Soap', price: 1000, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec', description: 'Antibacterial soap.', weight: '175g', brand: 'Dettol', inStock: true },
  { id: 'hb7', name: 'Sunscreen SPF50', price: 12000, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f', description: 'Sun protection.', weight: '50ml', brand: 'Nivea', inStock: true },
  { id: 'hb8', name: 'Conditioner', price: 3500, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d', description: 'Smooth hair.', weight: '400ml', brand: 'Pantene', inStock: true },
  { id: 'hb9', name: 'Razor Pack', price: 2000, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348', description: 'Disposable razors.', weight: 'Pack of 3', brand: 'Gillette', inStock: true },
  { id: 'hb10', name: 'Hand Cream', price: 2500, category: 'Health & Beauty', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', description: 'Soft hands.', weight: '75ml', brand: 'Nivea', inStock: true },

  // --- BAKERY (10) ---
  { id: 'bk1', name: 'White Bread', price: 1200, category: 'Bakery', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef', description: 'Sliced white bread.', weight: '800g', brand: 'Simba Bakery', inStock: true },
  { id: 'bk2', name: 'Croissants', price: 3500, category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', description: 'Butter croissants.', weight: 'Pack of 4', brand: 'Simba Bakery', inStock: true },
  { id: 'bk3', name: 'Brown Bread', price: 1300, category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', description: 'Whole wheat bread.', weight: '800g', brand: 'Simba Bakery', inStock: true },
  { id: 'bk4', name: 'Muffins', price: 3000, category: 'Bakery', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa', description: 'Chocolate chip muffins.', weight: 'Pack of 6', brand: 'Simba Bakery', inStock: true },
  { id: 'bk5', name: 'Burger Buns', price: 1500, category: 'Bakery', image: 'https://images.unsplash.com/photo-1558936997-7ce85d68d197', description: 'Soft sesame buns.', weight: 'Pack of 6', brand: 'Simba Bakery', inStock: true },
  { id: 'bk6', name: 'Scones', price: 2000, category: 'Bakery', image: 'https://images.unsplash.com/photo-1563897457788-b4b087037748', description: 'Tea scones.', weight: 'Pack of 6', brand: 'Simba Bakery', inStock: true },
  { id: 'bk7', name: 'Baguette', price: 800, category: 'Bakery', image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04', description: 'French stick.', weight: '1 pc', brand: 'Simba Bakery', inStock: true },
  { id: 'bk8', name: 'Donuts', price: 2500, category: 'Bakery', image: 'https://images.unsplash.com/photo-1551024601-5637ade845db', description: 'Glazed donuts.', weight: 'Pack of 4', brand: 'Simba Bakery', inStock: true },
  { id: 'bk9', name: 'Birthday Cake', price: 15000, category: 'Bakery', image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec', description: 'Vanilla sponge cake.', weight: '1 kg', brand: 'Simba Bakery', inStock: true },
  { id: 'bk10', name: 'Cookies', price: 4000, category: 'Bakery', image: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf38a', description: 'Chocolate cookies.', weight: 'Pack', brand: 'Simba Bakery', inStock: true },
];

export const BRANCHES: Branch[] = [
  {
    id: 'b1',
    name: 'Simba Center (Main)',
    address: 'KN 2 St, Kigali, Rwanda',
    phone: '+250 788 123 456',
    coordinates: { lat: -1.9441, lng: 30.0619 },
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800',
    hours: '7:00 AM - 11:00 PM'
  },
  {
    id: 'b2',
    name: 'Simba Gishushu',
    address: 'KG 8 Ave, Kigali',
    phone: '+250 788 654 321',
    coordinates: { lat: -1.9500, lng: 30.1000 },
    image: 'https://images.unsplash.com/photo-1580913428739-c2ae4b96839d?auto=format&fit=crop&q=80&w=800',
    hours: '8:00 AM - 10:00 PM'
  },
  {
    id: 'b3',
    name: 'Simba Kimironko',
    address: 'KG 11 Ave, Kigali',
    phone: '+250 788 111 222',
    coordinates: { lat: -1.9300, lng: 30.1300 },
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
    hours: '7:00 AM - 10:00 PM'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7829-XJ',
    date: 'Oct 24, 2023',
    total: 45200,
    status: 'delivered',
    paymentMethod: 'Mobile Money',
    deliveryAddress: 'KG 14 Ave, House 45, Nyarutarama',
    items: [
      { product: PRODUCTS[0], quantity: 2 },
      { product: PRODUCTS[5], quantity: 1 },
      { product: PRODUCTS[8], quantity: 1 }
    ],
    trackingHistory: [
      { status: 'delivered', label: 'Delivered', date: 'Oct 24, 14:30', completed: true, description: 'Package delivered to reception.' },
      { status: 'out-for-delivery', label: 'Out for Delivery', date: 'Oct 24, 13:15', completed: true, description: 'Rider: Jean Paul (Moto)' },
      { status: 'shipped', label: 'Shipped', date: 'Oct 24, 12:00', completed: true, description: 'Order has left Simba Center.' },
      { status: 'processing', label: 'Processing', date: 'Oct 24, 10:45', completed: true },
      { status: 'pending', label: 'Order Placed', date: 'Oct 24, 10:30', completed: true }
    ]
  },
  {
    id: 'ORD-9921-MC',
    date: 'Today',
    total: 12500,
    status: 'out-for-delivery',
    paymentMethod: 'Visa Card',
    deliveryAddress: 'KN 3 Rd, City Center, Kigali',
    estimatedDelivery: 'Today, 5:30 PM',
    items: [
      { product: PRODUCTS[1], quantity: 5 },
      { product: PRODUCTS[6], quantity: 2 }
    ],
    trackingHistory: [
      { status: 'delivered', label: 'Delivered', date: '', completed: false },
      { status: 'out-for-delivery', label: 'Out for Delivery', date: 'Today, 16:45', completed: true, description: 'Rider is 10 mins away' },
      { status: 'shipped', label: 'Shipped', date: 'Today, 16:30', completed: true },
      { status: 'processing', label: 'Processing', date: 'Today, 16:00', completed: true },
      { status: 'pending', label: 'Order Placed', date: 'Today, 15:55', completed: true }
    ]
  }
];
