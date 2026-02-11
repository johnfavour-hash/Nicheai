import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DashboardPage from '@pages/dashboard/page'

describe('DashboardPage', () => {
    it('should render the dashboard heading', () => {
        render(<DashboardPage />)
        expect(screen.getByRole('heading')).toBeInTheDocument()
    })
})
