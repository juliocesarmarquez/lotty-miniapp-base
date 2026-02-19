# Subagente: Frontend / UI

## 📋 Descripción
Este subagente es responsable de desarrollar la interfaz de usuario del proyecto Lotty usando Next.js 14, React 18 y Tailwind CSS, integrado con Lemon Cash SDK.

---

## UI-001: Setup Proyecto Next.js

### Descripción
Inicializar el proyecto frontend con Next.js 14 App Router y configurar la estructura base.

### Tareas
1. Crear proyecto Next.js con TypeScript
2. Configurar estructura de carpetas
3. Instalar dependencias base
4. Configurar scripts de desarrollo

### Comandos
```bash
npx create-next-app@14 frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd frontend
npm install @lemoncash/mini-app-sdk
```

### Archivo: `package.json`
```json
{
  "name": "lotty-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@lemoncash/mini-app-sdk": "^0.1.11",
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "14.2.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}
```

### Criterios de Aceptación
- [ ] Proyecto corre con `npm run dev`
- [ ] TypeScript configurado correctamente
- [ ] Lemon SDK instalado

### Dependencias
- Ninguna

---

## UI-002: Configuración Tailwind y Estilos Base

### Descripción
Configurar Tailwind CSS con tema personalizado para Lotty (Lemon yellow + Base blue).

### Tareas
1. Configurar tema en `tailwind.config.js`
2. Crear estilos globales en `globals.css`
3. Definir paleta de colores
4. Configurar fuentes

### Archivo: `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Lemon Cash
        lemon: {
          50: '#FFFEF0',
          100: '#FFFCCC',
          200: '#FFF899',
          300: '#FFF566',
          400: '#F5E100',
          500: '#E5D100',
          600: '#CCB900',
          700: '#998B00',
          800: '#665C00',
          900: '#332E00',
        },
        // Base Network
        base: {
          50: '#E6EDFF',
          100: '#CCDAFF',
          200: '#99B5FF',
          300: '#6690FF',
          400: '#336BFF',
          500: '#0052FF',
          600: '#0042CC',
          700: '#003199',
          800: '#002166',
          900: '#001033',
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 225, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 225, 0, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Archivo: `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

@layer base {
  :root {
    --background: 10 10 15;
    --foreground: 255 255 255;
    --lemon: 245 225 0;
    --base-blue: 0 82 255;
  }

  body {
    @apply bg-[rgb(var(--background))] text-[rgb(var(--foreground))];
    @apply antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-lemon-400 text-black font-semibold px-6 py-3 rounded-xl;
    @apply hover:bg-lemon-300 active:bg-lemon-500;
    @apply transition-all duration-200;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply bg-transparent border border-white/20 text-white px-6 py-3 rounded-xl;
    @apply hover:bg-white/10 active:bg-white/5;
    @apply transition-all duration-200;
  }

  .card {
    @apply bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl;
  }

  .card-glow {
    @apply card;
    @apply shadow-[0_0_30px_rgba(245,225,0,0.1)];
  }

  .input {
    @apply bg-white/5 border border-white/10 rounded-xl px-4 py-3;
    @apply text-white placeholder:text-white/40;
    @apply focus:outline-none focus:border-lemon-400/50;
    @apply transition-colors duration-200;
  }

  .stat-value {
    @apply text-2xl font-bold text-white;
  }

  .stat-label {
    @apply text-sm text-white/60 uppercase tracking-wider;
  }
}

@layer utilities {
  .text-gradient-lemon {
    @apply bg-gradient-to-r from-lemon-300 via-lemon-400 to-yellow-500;
    @apply bg-clip-text text-transparent;
  }

  .bg-gradient-dark {
    background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
  }

  .grid-pattern {
    background-image: 
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
}
```

### Criterios de Aceptación
- [ ] Colores Lemon y Base definidos
- [ ] Componentes base (btn, card, input) creados
- [ ] Fuentes cargadas correctamente
- [ ] Animaciones funcionando

### Dependencias
- UI-001

---

## UI-003: Componentes Base de UI

### Descripción
Crear componentes reutilizables de UI (Button, Card, Modal, Spinner).

### Tareas
1. Crear componente Button
2. Crear componente Card
3. Crear componente Modal
4. Crear componente Spinner/Loader

### Archivo: `src/components/ui/Button.tsx`
```tsx
'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    fullWidth = false,
    disabled,
    className = '',
    ...props 
  }, ref) => {
    const baseStyles = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2';
    
    const variants = {
      primary: 'bg-lemon-400 text-black hover:bg-lemon-300 active:bg-lemon-500',
      secondary: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
      ghost: 'bg-transparent text-white hover:bg-white/5',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Archivo: `src/components/ui/Card.tsx`
```tsx
'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    variant = 'default',
    padding = 'md',
    className = '',
    ...props 
  }, ref) => {
    const baseStyles = 'rounded-2xl backdrop-blur-sm';
    
    const variants = {
      default: 'bg-white/5 border border-white/10',
      glow: 'bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(245,225,0,0.1)]',
      outline: 'bg-transparent border border-white/20',
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
```

### Archivo: `src/components/ui/Modal.tsx`
```tsx
'use client';

import { useEffect, useCallback, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### Archivo: `src/components/ui/Spinner.tsx`
```tsx
'use client';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg
        className="animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  );
}
```

### Archivo: `src/components/ui/index.ts`
```tsx
export { Button } from './Button';
export { Card } from './Card';
export { Modal } from './Modal';
export { Spinner } from './Spinner';
```

### Criterios de Aceptación
- [ ] Todos los componentes exportados correctamente
- [ ] Props tipados con TypeScript
- [ ] Variantes funcionando
- [ ] Accesibilidad básica (keyboard navigation)

### Dependencias
- UI-002

---

## UI-004: Layout Principal y Página Home

### Descripción
Crear el layout principal de la aplicación y la estructura de la página home.

### Tareas
1. Crear layout con providers
2. Crear header con logo
3. Crear estructura de página home
4. Agregar background decorativo

### Archivo: `src/app/layout.tsx`
```tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lotty - No-Loss Lottery',
  description: 'Deposita USDC, genera yield con Aave, y participa en sorteos semanales sin perder tu capital.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-dark min-h-screen">
        {/* Background Pattern */}
        <div className="fixed inset-0 grid-pattern pointer-events-none" />
        
        {/* Floating Orbs */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-lemon-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-base-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
```

### Archivo: `src/components/Header.tsx`
```tsx
'use client';

interface HeaderProps {
  walletAddress?: string;
}

export function Header({ walletAddress }: HeaderProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="w-full px-4 py-4">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🎰</span>
          <span className="text-xl font-bold text-gradient-lemon">Lotty</span>
        </div>
        
        {/* Wallet / Network Badge */}
        <div className="flex items-center gap-2">
          {/* Base Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-base-500/20 border border-base-500/30 rounded-full">
            <svg className="w-4 h-4" viewBox="0 0 111 111" fill="none">
              <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z" fill="#0052FF"/>
            </svg>
            <span className="text-xs font-medium text-base-400">Base</span>
          </div>
          
          {/* Wallet Address */}
          {walletAddress && (
            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="text-xs font-mono text-white/70">
                {formatAddress(walletAddress)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
```

### Archivo: `src/app/page.tsx`
```tsx
import { LottyApp } from '@/components/LottyApp';

export default function Home() {
  return (
    <main className="min-h-screen pb-8">
      <LottyApp />
    </main>
  );
}
```

### Archivo: `src/components/LottyApp.tsx` (Placeholder)
```tsx
'use client';

import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Card } from './ui';

export function LottyApp() {
  const [isLemonApp, setIsLemonApp] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();

  useEffect(() => {
    // Check if running in Lemon app
    // Will be implemented in integration tasks
    setIsLemonApp(true); // Placeholder
  }, []);

  return (
    <div className="flex flex-col">
      <Header walletAddress={walletAddress} />
      
      <div className="px-4 max-w-lg mx-auto w-full space-y-4">
        {/* Hero Section */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient-lemon">Lotería Sin Pérdida</span>
          </h1>
          <p className="text-white/60 text-sm">
            Deposita USDC • Genera yield • Gana el sorteo
          </p>
        </div>

        {/* Stats Panel - Placeholder */}
        <Card variant="glow">
          <div className="text-center py-8">
            <p className="text-white/40">Cargando estadísticas...</p>
          </div>
        </Card>

        {/* User Position - Placeholder */}
        <Card>
          <div className="text-center py-8">
            <p className="text-white/40">Conecta tu wallet</p>
          </div>
        </Card>

        {/* Deposit Form - Placeholder */}
        <Card>
          <div className="text-center py-8">
            <p className="text-white/40">Formulario de depósito</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
```

### Criterios de Aceptación
- [ ] Layout responsive
- [ ] Background con pattern y orbs
- [ ] Header muestra logo y wallet
- [ ] Estructura de página definida

### Dependencias
- UI-003

---

## UI-005: Componente DepositForm

### Descripción
Crear el formulario para depositar y participar en la lotería.

### Tareas
1. Crear selector de cantidad predefinida
2. Crear input para cantidad custom
3. Agregar botones de acción
4. Mostrar información de tickets

### Archivo: `src/components/DepositForm.tsx`
```tsx
'use client';

import { useState } from 'react';
import { Button, Card } from './ui';
import { Wallet, Coins, Ticket, ArrowRight } from 'lucide-react';

interface DepositFormProps {
  onDeposit: (amount: number) => Promise<void>;
  onWithdraw: () => Promise<void>;
  isLoading: boolean;
  isParticipating: boolean;
  usdcBalance: number;
}

const PRESET_AMOUNTS = [10, 50, 100, 500];

export function DepositForm({ 
  onDeposit, 
  onWithdraw,
  isLoading, 
  isParticipating,
  usdcBalance 
}: DepositFormProps) {
  const [amount, setAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);

  const selectedAmount = isCustom ? Number(customAmount) || 0 : amount;
  const tickets = Math.floor(selectedAmount / 10);

  const handlePresetClick = (value: number) => {
    setAmount(value);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setIsCustom(true);
  };

  const handleSubmit = async () => {
    if (selectedAmount < 10) return;
    await onDeposit(selectedAmount);
  };

  return (
    <Card padding="lg">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-lemon-400/20 rounded-xl">
            <Coins className="w-5 h-5 text-lemon-400" />
          </div>
          <div>
            <h3 className="font-semibold">
              {isParticipating ? 'Tu Participación' : 'Participar'}
            </h3>
            <p className="text-sm text-white/50">
              Balance: {usdcBalance.toLocaleString()} USDC
            </p>
          </div>
        </div>

        {!isParticipating ? (
          <>
            {/* Preset Amounts */}
            <div className="grid grid-cols-4 gap-2">
              {PRESET_AMOUNTS.map((value) => (
                <button
                  key={value}
                  onClick={() => handlePresetClick(value)}
                  className={`
                    py-3 rounded-xl font-semibold text-sm transition-all
                    ${amount === value && !isCustom
                      ? 'bg-lemon-400 text-black'
                      : 'bg-white/5 text-white hover:bg-white/10'
                    }
                  `}
                >
                  ${value}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                $
              </span>
              <input
                type="text"
                placeholder="Cantidad personalizada"
                value={customAmount}
                onChange={handleCustomChange}
                className={`
                  w-full pl-8 pr-4 py-3 bg-white/5 border rounded-xl
                  text-white placeholder:text-white/30
                  focus:outline-none transition-colors
                  ${isCustom && customAmount 
                    ? 'border-lemon-400/50' 
                    : 'border-white/10 focus:border-white/20'
                  }
                `}
              />
            </div>

            {/* Tickets Preview */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-lemon-400" />
                <span className="text-sm text-white/70">Tickets</span>
              </div>
              <span className="font-bold text-lg">{tickets}</span>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              loading={isLoading}
              disabled={selectedAmount < 10 || selectedAmount > usdcBalance}
              fullWidth
              size="lg"
            >
              <Wallet className="w-5 h-5" />
              Depositar ${selectedAmount}
              <ArrowRight className="w-5 h-5" />
            </Button>

            <p className="text-xs text-center text-white/40">
              Mínimo $10 • Tu capital siempre seguro en Aave
            </p>
          </>
        ) : (
          <>
            {/* Already Participating */}
            <div className="text-center py-4">
              <p className="text-white/60 text-sm">
                Ya estás participando en el sorteo actual
              </p>
            </div>

            <Button 
              onClick={onWithdraw}
              loading={isLoading}
              variant="secondary"
              fullWidth
            >
              Retirar y Salir
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
```

### Criterios de Aceptación
- [ ] Selector de cantidades predefinidas
- [ ] Input de cantidad custom
- [ ] Cálculo de tickets correcto
- [ ] Validación de balance
- [ ] Estados loading/disabled

### Dependencias
- UI-003

---

## UI-006: Componente YourProfile

### Descripción
Vista de perfil del usuario mostrando balances, información de wallet y botón de faucet para testnet.

### Tareas
1. Mostrar balance total y balance en pool
2. Mostrar tickets activos y APY actual
3. Mostrar dirección de wallet con botón de copiar
4. Mostrar balance USDC
5. Mostrar botón de faucet cuando balance USDC < 100 (solo testnet)

### Archivo: `src/views/YourProfile.tsx`
```tsx
'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { formatAddress } from '@/lib/constants';

interface YourProfileProps {
    address: string;
    totalBalance: number;
    usdInPool: number;
    activeTickets: number;
    currentAPY: number;
    usdcBalance: number;
    onMintUsdc?: () => void;      // Callback para mintear USDC (faucet)
    isMinting?: boolean;           // Estado de loading del mint
    contractsReady?: boolean;      // Contratos inicializados
}

export function YourProfile({
    address,
    totalBalance,
    usdInPool,
    activeTickets,
    currentAPY,
    usdcBalance,
    onMintUsdc,
    isMinting = false,
    contractsReady = false,
}: YourProfileProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-cream pb-24 px-4">
            <div className="max-w-lg mx-auto py-6 space-y-6">
                {/* Header */}
                <header className="text-center">
                    <h1 className="text-3xl font-display font-bold text-text-main mb-1">
                        Your Profile
                    </h1>
                    <p className="text-sm text-text-main/60">
                        Account overview and balances
                    </p>
                </header>

                {/* Balance Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                        <div className="neo-card">
                            <p className="text-sm text-text-main/60 mb-1">💰 Total Balance</p>
                            <p className="text-4xl font-display font-bold text-text-main mb-2">
                                ${totalBalance.toFixed(2)}
                            </p>
                            <p className="text-xs text-text-main/60">
                                ${usdInPool.toFixed(2)} in pool
                            </p>
                        </div>
                    </div>

                    <StatCard icon="🎟️" label="Active Tickets" value={activeTickets} variant="yellow" />
                    <StatCard icon="📈" label="Current APY" value={`${currentAPY}%`} />
                </div>

                {/* Wallet Info */}
                <div className="neo-card">
                    <h3 className="text-lg font-display font-bold text-text-main mb-4">
                        👛 Wallet
                    </h3>

                    {/* Wallet Address */}
                    <div className="mb-4">
                        <label className="block text-xs text-text-main/60 mb-2">Address</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={formatAddress(address)}
                                readOnly
                                className="flex-1 px-3 py-2 bg-gray-light border-2 border-border-black
                                         rounded-lg font-mono text-sm text-text-main"
                            />
                            <button onClick={handleCopy} className="w-10 h-10 flex items-center justify-center
                                         bg-primary-yellow border-2 border-border-black rounded-lg
                                         hover:bg-lemon-500 transition-colors" title="Copy address">
                                {copied ? <Check size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={3} />}
                            </button>
                        </div>
                    </div>

                    {/* Asset Balances */}
                    <div className="space-y-3 pt-3 border-t-2 border-border-black">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">💵</span>
                                <span className="text-sm font-display font-bold text-text-main">USDC Balance</span>
                            </div>
                            <span className="text-lg font-display font-bold text-text-main">
                                ${usdcBalance.toFixed(2)}
                            </span>
                        </div>

                        {/* Faucet Button - Show when USDC balance is low */}
                        {usdcBalance < 100 && onMintUsdc && (
                            <button
                                onClick={onMintUsdc}
                                disabled={isMinting || !contractsReady}
                                className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400
                                         text-white text-sm font-display font-bold rounded-xl
                                         border-3 border-border-black shadow-neo-sm
                                         transition-colors disabled:cursor-not-allowed"
                            >
                                {isMinting ? '⏳ Minting...' : '🪙 Get 1000 Test USDC'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Account Stats */}
                <div className="neo-card-yellow">
                    <h3 className="font-display font-bold text-text-main mb-3">📊 Account Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-text-main/60 mb-1">Deposits</p>
                            <p className="text-2xl font-display font-bold text-text-main">
                                ${usdInPool.toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-text-main/60 mb-1">Est. Weekly Yield</p>
                            <p className="text-2xl font-display font-bold text-text-main">
                                ${(usdInPool * currentAPY / 100 / 52).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```

### Criterios de Aceptación
- [ ] Muestra balance total y en pool
- [ ] Muestra tickets activos y APY
- [ ] Dirección de wallet con botón de copiar funcional
- [ ] Balance USDC visible
- [ ] Botón de faucet aparece cuando USDC < 100
- [ ] Botón de faucet deshabilitado mientras minting o contratos no listos

### Dependencias
- UI-003

---

## UI-007: Componente StatsPanel

### Descripción
Panel con estadísticas globales de la lotería.

### Tareas
1. Mostrar pool total
2. Mostrar premio estimado
3. Mostrar número de participantes
4. Mostrar countdown al sorteo

### Archivo: `src/components/StatsPanel.tsx`
```tsx
'use client';

import { Card } from './ui';
import { CountdownTimer } from './CountdownTimer';
import { Trophy, Users, Coins, Clock } from 'lucide-react';

interface StatsPanelProps {
  totalDeposits: number;
  prizePool: number;
  participantCount: number;
  timeUntilDraw: number; // seconds
  estimatedWeeklyYield: number;
}

export function StatsPanel({
  totalDeposits,
  prizePool,
  participantCount,
  timeUntilDraw,
  estimatedWeeklyYield,
}: StatsPanelProps) {
  return (
    <Card variant="glow" padding="lg">
      <div className="space-y-5">
        {/* Prize Pool - Main Highlight */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lemon-400/20 rounded-full mb-3">
            <Trophy className="w-4 h-4 text-lemon-400" />
            <span className="text-xs font-medium text-lemon-400">
              Premio Actual
            </span>
          </div>
          <p className="text-4xl font-bold text-gradient-lemon">
            ${prizePool.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-white/50 mt-1">
            ~${estimatedWeeklyYield.toFixed(2)} yield estimado
          </p>
        </div>

        {/* Countdown */}
        <div className="text-center py-4 bg-white/5 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-white/40" />
            <span className="text-sm text-white/50">Próximo Sorteo</span>
          </div>
          <CountdownTimer targetSeconds={timeUntilDraw} />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Coins className="w-4 h-4 text-white/40" />
              <span className="text-xs text-white/50">Pool Total</span>
            </div>
            <p className="font-bold text-lg">
              ${totalDeposits.toLocaleString()}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-4 h-4 text-white/40" />
              <span className="text-xs text-white/50">Participantes</span>
            </div>
            <p className="font-bold text-lg">{participantCount}</p>
          </div>
        </div>

        {/* APY Badge */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full text-xs text-green-400">
            Powered by Aave • ~4% APY
          </span>
        </div>
      </div>
    </Card>
  );
}
```

### Criterios de Aceptación
- [ ] Prize pool destacado visualmente
- [ ] Countdown funcional
- [ ] Estadísticas formateadas
- [ ] Badge de Aave APY

### Dependencias
- UI-003

---

## UI-008: Componente CountdownTimer

### Descripción
Timer de cuenta regresiva para el próximo sorteo.

### Archivo: `src/components/CountdownTimer.tsx`
```tsx
'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetSeconds: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetSeconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetSeconds));

  useEffect(() => {
    let remaining = targetSeconds;
    
    const timer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft(calculateTimeLeft(remaining));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetSeconds]);

  return (
    <div className="flex items-center justify-center gap-3">
      <TimeUnit value={timeLeft.days} label="días" />
      <span className="text-white/30 text-xl">:</span>
      <TimeUnit value={timeLeft.hours} label="hrs" />
      <span className="text-white/30 text-xl">:</span>
      <TimeUnit value={timeLeft.minutes} label="min" />
      <span className="text-white/30 text-xl">:</span>
      <TimeUnit value={timeLeft.seconds} label="seg" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold font-mono tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs text-white/40">{label}</div>
    </div>
  );
}

function calculateTimeLeft(totalSeconds: number): TimeLeft {
  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds };
}
```

### Criterios de Aceptación
- [ ] Cuenta regresiva precisa
- [ ] Actualización cada segundo
- [ ] Formato con leading zeros
- [ ] Se detiene en 0

### Dependencias
- UI-003

---

## UI-009: Componente DrawHistory

### Descripción
Historial de sorteos anteriores.

### Archivo: `src/components/DrawHistory.tsx`
```tsx
'use client';

import { Card } from './ui';
import { Trophy, Calendar, Users } from 'lucide-react';

interface DrawResult {
  drawId: number;
  winner: string;
  prize: number;
  timestamp: number;
  totalParticipants: number;
}

interface DrawHistoryProps {
  draws: DrawResult[];
  userAddress?: string;
}

export function DrawHistory({ draws, userAddress }: DrawHistoryProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (draws.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-white/40">Aún no hay sorteos</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="sm">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold">Sorteos Anteriores</h3>
      </div>
      
      <div className="divide-y divide-white/5">
        {draws.slice(0, 5).map((draw) => {
          const isWinner = userAddress?.toLowerCase() === draw.winner.toLowerCase();
          
          return (
            <div 
              key={draw.drawId}
              className={`p-4 ${isWinner ? 'bg-lemon-400/10' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2 rounded-xl
                    ${isWinner ? 'bg-lemon-400/20' : 'bg-white/5'}
                  `}>
                    <Trophy className={`w-4 h-4 ${isWinner ? 'text-lemon-400' : 'text-white/40'}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${isWinner ? 'text-lemon-400' : ''}`}>
                      {isWinner ? '¡Ganaste!' : formatAddress(draw.winner)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(draw.timestamp)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {draw.totalParticipants}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ${draw.prize.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-white/40">
                    Sorteo #{draw.drawId}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
```

### Criterios de Aceptación
- [ ] Lista de sorteos recientes
- [ ] Highlight si el usuario ganó
- [ ] Formato de direcciones y fechas
- [ ] Estado vacío

### Dependencias
- UI-003

---

## 📋 Resumen de Archivos a Crear

| Archivo | Tarea |
|---------|-------|
| `package.json` | UI-001 |
| `tailwind.config.js` | UI-002 |
| `src/app/globals.css` | UI-002 |
| `src/components/ui/Button.tsx` | UI-003 |
| `src/components/ui/Card.tsx` | UI-003 |
| `src/components/ui/Modal.tsx` | UI-003 |
| `src/components/ui/Spinner.tsx` | UI-003 |
| `src/app/layout.tsx` | UI-004 |
| `src/components/Header.tsx` | UI-004 |
| `src/app/page.tsx` | UI-004 |
| `src/components/LottyApp.tsx` | UI-004 |
| `src/components/DepositForm.tsx` | UI-005 |
| `src/views/YourProfile.tsx` | UI-006 |
| `src/components/StatsPanel.tsx` | UI-007 |
| `src/components/CountdownTimer.tsx` | UI-008 |
| `src/components/DrawHistory.tsx` | UI-009 |

---

## ⏱️ Estimación de Tiempo

| Tarea | Tiempo |
|-------|--------|
| UI-001 | 15 min |
| UI-002 | 30 min |
| UI-003 | 45 min |
| UI-004 | 30 min |
| UI-005 | 45 min |
| UI-006 | 30 min |
| UI-007 | 30 min |
| UI-008 | 20 min |
| UI-009 | 30 min |
| **Total** | **~4.5 horas** |
