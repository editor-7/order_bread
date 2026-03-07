import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          fontFamily: 'sans-serif',
          background: '#fff5f5',
          minHeight: '100vh',
          color: '#c53030',
        }}>
          <h1>오류가 발생했습니다</h1>
          <pre style={{ overflow: 'auto', marginTop: '1rem', fontSize: '0.9rem' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
