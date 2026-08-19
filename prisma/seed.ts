import { prisma } from '../lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  console.log('Starting the seeding');

  const products = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 999, max: 29999 }),
    stock: faker.number.int({ min: 0, max: 100 }),
  }));

  await prisma.product.createMany({ data: products });
}

main()
  .then(() => console.log('Seeded ✅'))
  .catch((e) => console.error(e))
  .finally(() => {
    console.log('finally done :)');

    prisma.$disconnect()
  });