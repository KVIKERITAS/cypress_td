# Automated Tests Using Cypress

This repository contains a basic automated tests for an online ecommerce shop. 

## Setup

To run the project clone git repo and use:

```bash
  npm i
  npm run test
```

Select E2E and a test you want to run.

## First test:
1. Navigates to Men’s Hoodies & Sweatshirts section through navigation.
2. Checks if pathname is good.
3. Checks that the displayed number of jackets matches the selected number of jackets displayed per page without using magic numbers.
4. Selects “Frankie Sweatshirt” and opens its details.
5. Checks if right item is opened.
6. Selects size, colour and quantity.
7. Checks if all selected parameters are right.
8. Adds product to cart and checks that cart icon is updated with product quantity.
9. Opens cart and checks if product match.
10. Proceeds to checkout.
11. Checks if pathname is good
12. Completes the order with prewritten data.
13. Checks if data output is correct.

## Second test:
1. Navigates to Women's Pants section through navigation.
2. Filters section to show the cheapest products available.
3. Checks if filter is applied through url.
4. Selects the cheapest pants and adds them to the cart.
5. Checks if all selected parameters are right.
6. Adds 2 more products to the cart.
7. Checks if all selected parameters are right.
8. Removes a product from the cart.
9. Checks if product is successfully removed.
10. Proceeds to checkout.
11. Completes the order with prewritten data.
12. Checks if data output is correct.

<sub>*Slight modifications to tests are possible through configs in each test file.</sub>
   
