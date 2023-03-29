import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
import Calculator from '../src/layout/Calculator.svelte'

describe('Calculator Component', () => {
  beforeEach(() => render(Calculator))

  test('Shows Proper Heading', () => {
    // Index Page
    expect(screen.getByText('Finals Calculator')).toBeInTheDocument()
    expect(screen.getByText('Developed by')).toBeInTheDocument()
  })

  test('Click the Calculate Button', async () => {
    // Click the calculate button on default values
    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('58%')).toBeInTheDocument()
    expect(screen.getByText('18%')).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Input Finals Score')
    await fireEvent.input(input, { target: { value: '100' } })
    expect(screen.getByText('100 (A)')).toBeInTheDocument()

    await fireEvent.input(input, { target: { value: '57' } })
    expect(screen.getByText('89.25 (B)')).toBeInTheDocument()
  })

  test('Alter performance evaluation', async () => {
    // Change the performance evaluation to 30
    const input = screen.getByLabelText('Performance Evaluation')
    await fireEvent.input(input, { target: { value: '40' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('58%')).toBeInTheDocument()
    expect(screen.getByText('18%')).toBeInTheDocument()
  })

  test('Alter midterm', async () => {
    // Change midterm
    const input = screen.getByLabelText('Midterm Score')
    await fireEvent.input(input, { target: { value: '96' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('62%')).toBeInTheDocument()
    expect(screen.getByText('22%')).toBeInTheDocument()
  })

  test('Alter weight, correct format', async () => {
    // Alter weight
    const input = screen.getByLabelText(
      'Midterm and Finals each weight (25, 30, 35)'
    )
    await fireEvent.input(input, { target: { value: '35' } })

    const input2 = screen.getByLabelText('6 ~ 30')
    await fireEvent.input(input2, { target: { value: '30' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(screen.getByText('42%')).toBeInTheDocument()
    expect(screen.getByText('13%')).toBeInTheDocument()
  })

  test('Alter Midterm Field', async () => {
    // Switch to without midterm
    const input = screen.getByTestId('switch')
    await fireEvent.click(input)

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('79%')).toBeInTheDocument()
    expect(screen.getByText('59%')).toBeInTheDocument()
    expect(screen.getByText('39%')).toBeInTheDocument()
    expect(screen.getByText('19%')).toBeInTheDocument()
  })
})
