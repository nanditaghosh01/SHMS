import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[LUMORA ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    // Clear all cached lumora keys in case corrupted state was stored
    try {
      const keysToRemove = [
        'lumora_rooms',
        'lumora_bookings',
        'lumora_tasks',
        'lumora_inventory',
        'lumora_staff',
        'lumora_services',
        'lumora_user_role'
      ];
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.href = '/';
  };

  private handleTryAgain = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B1957',
            color: '#FFFFFF',
            padding: '2rem',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: '#16225E',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
              textAlign: 'center'
            }}
          >
            {/* Emblem */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(210, 179, 219, 0.15)',
                border: '1px solid #D2B3DB',
                color: '#E8D9ED',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                marginBottom: '1.5rem'
              }}
            >
              ✦
            </div>

            <h1
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#FFFFFF',
                fontFamily: "'Outfit', sans-serif",
                marginBottom: '0.6rem',
                letterSpacing: '-0.01em'
              }}
            >
              LUMORA Hospitality Platform
            </h1>

            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              An interface rendering interruption was encountered. You can reload the page or reset the local demo state to restore initial factory settings.
            </p>

            {this.state.error && (
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '0.9rem 1.1rem',
                  fontSize: '0.78rem',
                  color: '#FECACA',
                  fontFamily: 'monospace',
                  textAlign: 'left',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  marginBottom: '2rem'
                }}
              >
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleTryAgain}
                style={{
                  padding: '0.75rem 1.6rem',
                  backgroundColor: '#426BC2',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                Try Again
              </button>

              <button
                onClick={this.handleReset}
                style={{
                  padding: '0.75rem 1.6rem',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
              >
                Reset Demo State & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
