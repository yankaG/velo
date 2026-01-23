import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
  
    ///AAA - Arrange, Act, Assert - Arrange: Preparar o teste, Act: Executar o teste, Assert: Verificar o resultado

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByTestId('search-order-id').fill('VLO-UG7N2V')
  await page.getByTestId('search-order-button').click()

  // Assert
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-UG7N2V')

  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})