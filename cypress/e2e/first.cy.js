import shippingData from '../fixtures/shippingData'

const selectors = {
	navbar: {
		main: '#store.menu',
		men: '#ui-id-5',
		menTops: '#ui-id-17',
		menHoodiesAndSweaters: '#ui-id-20',
	},
	menPage: {
		pathname: '/men/tops-men/hoodies-and-sweatshirts-men.html',
		limiter: '#limiter',
		items: '.item.product-item',
		itemLink: '.product-item-link',
	},
	itemPage: {
		itemTitle: '[data-ui-id="page-title-wrapper"]',
		sizeAttribute: '[attribute-id="143"]',
		sizeButtonL: '#option-label-size-143-item-169',
		colorButtonWhite: '#option-label-color-93-item-59',
		colorAttribute: '[attribute-id="93"]',
		qtyInput: '#qty',
		addToCartButton: '#product-addtocart-button',
		cartCounter: '.counter-number',
		cartButton: '[data-block="minicart"]',
	},
	checkoutModal: {
		miniCart: '#mini-cart',
		checkoutButton: '#top-cart-btn-checkout',
		itemLabel: '.product-item-details .product-item-name',
	},
	checkoutPage: {
		pathname: '/checkout/',
		customerEmail: '#customer-email',
		customerFirstName: '[name="firstname"]',
		customerLastName: '[name="lastname"]',
		customerCompany: '[name="company"]',
		customerAddress1: '[name="street[0]"]',
		customerCity: '[name="city"]',
		customerCountry: '[name="country_id"]',
		customerState: '[name="shippingAddress.region_id"] > div > select',
		customerZip: '[name="postcode"]',
		customerPhone: '[name="telephone"]',
		methodRadio: 'input.radio',
		spinner: '[title="Loading..."]',
		nextButton: '[data-role="opc-continue"]',
	},
	orderPage: {
		orderInfo: '.billing-address-details',
		orderButton: '[title="Place Order"]',
	},
	successPage: {
		pathname: '/checkout/',
		registration: '#registration',
	},
}

const itemName = 'Frankie Sweatshirt'
const itemSize = 'L'
const itemColor = 'White'
const itemQty = 2

describe('Scenario one', () => {
	it('Orders a certain item from mens Hoodies and Sweatshirts category', () => {
		cy.visit('/')

		cy.get(selectors.navbar.men).trigger('mouseover')
		cy.get(selectors.navbar.menTops).trigger('mouseover')
		cy.get(selectors.navbar.menHoodiesAndSweaters).click()

		cy.location('pathname').should('equal', selectors.menPage.pathname)

		cy.get(selectors.menPage.limiter)
			.invoke('val')
			.then(value => {
				const selectedValue = parseInt(value)
				cy.get(selectors.menPage.items).then(items => {
					const displayedItems = items.length

					expect(selectedValue).to.equal(displayedItems)
				})
			})
		cy.get(selectors.menPage.itemLink).contains(itemName).click()

		cy.get(selectors.itemPage.itemTitle).should('contain.text', itemName)
		cy.get(selectors.itemPage.sizeButtonL).click()
		cy.get(selectors.itemPage.sizeAttribute).within(() => {
			cy.get('span').should('contain.text', itemSize)
		})
		cy.get(selectors.itemPage.colorButtonWhite).click()
		cy.get(selectors.itemPage.colorAttribute).within(() => {
			cy.get('span').should('contain.text', itemColor)
		})
		cy.get(selectors.itemPage.qtyInput).clear().type(itemQty)
		cy.get(selectors.itemPage.addToCartButton).click()
		cy.get(selectors.itemPage.addToCartButton).should('contain.text', 'Adding').wait(1000)
		cy.get(selectors.itemPage.addToCartButton).should('contain.text', 'Added')
		cy.get(selectors.itemPage.cartCounter).should('contain.text', parseInt(itemQty))
		cy.get(selectors.itemPage.cartButton).click()
		cy.get(selectors.checkoutModal.miniCart).within(() => {
			cy.get(selectors.checkoutModal.itemLabel).contains(itemName)
		})

		cy.get(selectors.checkoutModal.checkoutButton).click()

		cy.location('pathname').should('equal', selectors.checkoutPage.pathname)

		cy.get(selectors.checkoutPage.customerEmail).type(shippingData.testEmail)
		cy.get(selectors.checkoutPage.customerFirstName).type(shippingData.testFirstName)
		cy.get(selectors.checkoutPage.customerLastName).type(shippingData.testLastName)
		cy.get(selectors.checkoutPage.customerCompany).type(shippingData.testCompany)
		cy.get(selectors.checkoutPage.customerAddress1).type(shippingData.testAddress)
		cy.get(selectors.checkoutPage.customerCity).type(shippingData.testCity)
		cy.get(selectors.checkoutPage.customerCountry).select(shippingData.testCountry)
		cy.get(selectors.checkoutPage.customerState).select(shippingData.testState)
		cy.get(selectors.checkoutPage.customerZip).type(shippingData.testZip)
		cy.get(selectors.checkoutPage.customerPhone).type(shippingData.testPhone).wait(3000)

		cy.get(selectors.checkoutPage.methodRadio).first().click()
		cy.get(selectors.checkoutPage.nextButton).click()

		cy.get(selectors.orderPage.orderInfo)
			.should('be.visible')
			.then(details => {
				expect(details[0].innerText).include(shippingData.testFirstName)
				expect(details[0].innerText).include(shippingData.testLastName)
				expect(details[0].innerText).include(shippingData.testAddress)
				expect(details[0].innerText).include(shippingData.testCity)
				expect(details[0].innerText).include(shippingData.testState)
				expect(details[0].innerText).include(shippingData.testZip)
				expect(details[0].innerText).include(shippingData.testCountry)
				expect(details[0].innerText).include(shippingData.testPhone)
			})
		cy.get(selectors.orderPage.orderButton).click()

		cy.location('pathname').should('equal', selectors.successPage.pathname)
		cy.get(selectors.successPage.registration).within(() => {
			cy.get('span').should('contain.text', shippingData.testEmail)
		})
	})
})
