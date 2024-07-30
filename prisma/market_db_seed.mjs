import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_ITEMS = 20;
const NUM_SALES = 30;
const NUM_OFFERS = 15;
const NUM_ORDERS = 40;

async function main() {
  console.log('Seeding data...');

  // Create users
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        companyName: faker.company.name(),
        profilePic: faker.image.avatar(),
      },
    });
    users.push(user);
  }
  console.log('Created users:', users);

  // Create items
  const items = [];
  for (let i = 0; i < NUM_ITEMS; i++) {
    const item = await prisma.item.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
        color: faker.color.human(),
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        price: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
        estimated_delivery_date: faker.date.future(),
        destination_delivery_date: faker.date.future(),
        stock: faker.number.int({ min: 1, max: 100 }),
        image_url: faker.image.url(),
      },
    });
    items.push(item);
  }
  console.log('Created items:', items);

  // Create sales
  for (let i = 0; i < NUM_SALES; i++) {
    await prisma.sale.create({
      data: {
        item_id: items[faker.number.int({ min: 0, max: items.length - 1 })].id,
        quantity: faker.number.int({ min: 1, max: 10 }),
        sale_date: faker.date.past(),
        total_amount: faker.number.float({ min: 20, max: 1000, precision: 0.01 }),
      },
    });
  }
  console.log('Created sales');

  // Create offers
  for (let i = 0; i < NUM_OFFERS; i++) {
    await prisma.offer.create({
      data: {
        item_id: items[faker.number.int({ min: 0, max: items.length - 1 })].id,
        discount_percentage: faker.number.float({ min: 5, max: 50, precision: 0.01 }),
        start_date: faker.date.past(),
        end_date: faker.date.future(),
      },
    });
  }
  console.log('Created offers');

  // Create orders
  for (let i = 0; i < NUM_ORDERS; i++) {
    await prisma.order.create({
      data: {
        item_id: items[faker.number.int({ min: 0, max: items.length - 1 })].id,
        user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        quantity: faker.number.int({ min: 1, max: 5 }),
        order_date: faker.date.past(),
        total_amount: faker.number.float({ min: 50, max: 2000, precision: 0.01 }),
      },
    });
  }
  console.log('Created orders');

  // Optional: Create other entities like contacts, posts, etc.
  // ...
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
