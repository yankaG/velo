import { test, expect } from '@playwright/test'

///AAA - Arrange, Act, Assert - Arrange: Preparar o teste, Act: Executar o teste, Assert: Verificar o resultado

import { gerarCodigoPedido } from '../support/helpers'

test('deve consultar um pedido aprovado', async ({ page }) => {

  // Test Data
  const order = 'VLO-UG7N2V'

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click({timeout: 10_000})

  // Assert

  const containerPedido = page.getByRole('paragraph')
     .filter({hasText: /^Pedido$/})
     .locator('..') // Sobe para o elemento pai (a div que agrupa ambos) 

  await expect(containerPedido).toContainText(order, {timeout: 10_000})

  await expect(page.getByText('APROVADO')).toBeVisible()

})

test('deve exibir mensagem quando o pedido não é encontrado', async ({page})=> {

  const order = gerarCodigoPedido()

  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click({timeout: 10_000})

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `)

})