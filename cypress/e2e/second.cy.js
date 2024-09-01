import 'cypress-real-events/support'
import shippingData from '../fixtures/shippingData'

const selectors = {
	navbar: {
		main: '#store.menu',
		women: '#ui-id-4',
		womenBottoms: '#ui-id-10',
		womenPants: '#ui-id-15',
	},
	womenPage: {
		sort: '#sorter',
		productItem: '.product-item',
		sizeButton29: '#option-label-size-143-item-172',
		colorButtonGray: '#option-label-color-93-item-52',
		colorButtonBlue: '#option-label-color-93-item-50',
		sizeAttribute: '[attribute-id="143"]',
		colorAttribute: '[attribute-id="93"]',
		addToCartButton: '#product-addtocart-button',
		cartItems: '[data-block="minicart"] .counter .counter-number',
	},
	itemPage: {
		sizeAttribute: '[attribute-id="143"]',
		colorAttribute: '[attribute-id="93"]',
	},
	checkoutModal: {
		miniCart: '[data-block="minicart"]',
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

const itemSize = '29'
const itemColor = 'Gray'
const item2Color = 'Blue'

describe('Scenario two', () => {
	it('Orders certain items from women pants section', () => {
		cy.visit('/')

		cy.get(selectors.navbar.women).trigger('mouseover')
		cy.get(selectors.navbar.womenBottoms).trigger('mouseover')
		cy.get(selectors.navbar.womenPants).click()

		cy.get(selectors.womenPage.sort).first().select('price')
		cy.url().should('include', '/women/bottoms-women/pants-women.html?product_list_order=price')

		cy.get(selectors.womenPage.productItem).first().click()
		cy.get(selectors.womenPage.sizeButton29).click()
		cy.get(selectors.womenPage.sizeAttribute).within(() => {
			cy.get('span').should('contain.text', itemSize)
		})
		cy.get(selectors.womenPage.colorButtonGray).click()
		cy.get(selectors.womenPage.colorAttribute).within(() => {
			cy.get('span').should('contain.text', itemColor)
		})
		cy.get(selectors.womenPage.addToCartButton).click()

		cy.get(selectors.womenPage.cartItems).invoke('text').should('equal', '1')
		cy.go('back')

		cy.get(selectors.womenPage.productItem).eq(1).click()
		cy.get(selectors.womenPage.sizeButton29).click()
		cy.get(selectors.womenPage.sizeAttribute).within(() => {
			cy.get('span').should('contain.text', itemSize)
		})
		cy.get(selectors.womenPage.colorButtonBlue).click()
		cy.get(selectors.womenPage.colorAttribute).within(() => {
			cy.get('span').should('contain.text', item2Color)
		})
		cy.get(selectors.womenPage.addToCartButton).click()
		cy.get(selectors.womenPage.cartItems).invoke('text').should('equal', '2')
		cy.go('back')

		cy.get(selectors.womenPage.productItem).eq(2).click()
		cy.get(selectors.womenPage.sizeButton29).click()
		cy.get(selectors.womenPage.sizeAttribute).within(() => {
			cy.get('span').should('contain.text', itemSize)
		})
		cy.get(selectors.womenPage.colorButtonBlue).click()
		cy.get(selectors.womenPage.colorAttribute).within(() => {
			cy.get('span').should('contain.text', item2Color)
		})
		cy.get(selectors.womenPage.addToCartButton).click()
		cy.get(selectors.womenPage.cartItems).invoke('text').should('equal', '3')

		cy.get(selectors.checkoutModal.miniCart)
			.click()
			.within(() => {
				cy.get('.secondary').first().click()
			})

		cy.get('.action-primary.action-accept').click()
		cy.get(selectors.womenPage.cartItems).invoke('text').should('equal', '2')
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
