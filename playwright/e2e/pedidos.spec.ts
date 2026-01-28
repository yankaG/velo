import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
  
    ///AAA - Arrange, Act, Assert - Arrange: Preparar o teste, Act: Executar o teste, Assert: Verificar o resultado

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-UG7N2V')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click({timeout: 10_000})

  // Assert

  await expect(page.getByText('VLO-UG7N2V')).toBeVisible({timeout: 10_000})
  await expect(page.getByText('VLO-UG7N2V')).toContainText('VLO-UG7N2V')
  //await expect(page.getByTestId('order-result-VLO-UG7N2V')).toContainText('VLO-UG7N2V')

  await expect(page.getByText('APROVADO')).toBeVisible()
  await expect(page.getByText('APROVADO')).toContainText('APROVADO')
  //await expect(page.getByTestId('order-result-VLO-UG7N2V')).toContainText('APROVADO')
})