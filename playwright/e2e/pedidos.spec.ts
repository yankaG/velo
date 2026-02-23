import { test, expect } from '@playwright/test'

import { gerarCodigoPedido } from '../support/helpers'

import { OrderLockupPage } from '../support/pages/OrderLockupPage'

///AAA - Arrange, Act, Assert - Arrange: Preparar o teste, Act: Executar o teste, Assert: Verificar o resultado

test.describe('Consulta de Pedido', ()=> {
  
  test.beforeEach(async ({page}) => {
   // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    //const order = 'VLO-UG7N2V'
    const order = {
      number: 'VLO-UG7N2V',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Yanka Garcia',
        email: 'garcia@velo.dev'
      },
      payment: 'À Vista'
    }


  // Act
  
    const orderLockupPage = new OrderLockupPage(page)

    await orderLockupPage.searchOrder(order.number)

  // Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    const statusBadge = page.getByRole('status').filter({hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-green-100/)
    await expect(statusBadge).toHaveClass(/text-green-700/)
  
    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    //const order = 'VLO-ONDYEX'
    const order = {
      number: 'VLO-ONDYEX',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Patricia Silva',
        email: 'patricia@gmail.com',
      },
      payment: 'À Vista'
    }
    // Act
    
    const orderLockupPage = new OrderLockupPage(page)
    
    await orderLockupPage.searchOrder(order.number)
  
    // Assert
  
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);
  
    const statusBadge = page.getByRole('status').filter({hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-red-100/)
    await expect(statusBadge).toHaveClass(/text-red-700/)
  
    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-x/)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    //const order = 'VLO-ONDYEX'
    const order = {
      number: 'VLO-GM9NR5',
      status: 'EM_ANALISE',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Lunar Miler',
        email: 'lunar@velo.com',
      },
      payment: 'À Vista'
    }
    // Act
    
    const orderLockupPage = new OrderLockupPage(page)
    
    await orderLockupPage.searchOrder(order.number)
  
    // Assert
  
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);
  
    const statusBadge = page.getByRole('status').filter({hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-amber-100/)
    await expect(statusBadge).toHaveClass(/text-amber-700/)
  
    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide lucide-clock w-4 h-4/)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({page})=> {

    const order = gerarCodigoPedido()

    const orderLockupPage = new OrderLockupPage(page)
    
    await orderLockupPage.searchOrder(order)

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
    `)
  })
})
