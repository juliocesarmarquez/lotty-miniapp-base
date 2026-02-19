# Lotty – Pantallas UI (Sin Blockchain)

Versión **solo UI** de las pantallas de Lotty, sin dependencias de blockchain. Usa datos mock para mostrar la interfaz completa sin necesidad de OnchainKit, Wagmi o contratos.

## 🎨 Características

- ✅ **Sin dependencias blockchain** – No requiere OnchainKit, Wagmi, Viem
- ✅ **Datos mock** – Datos de ejemplo para ver la UI completa
- ✅ **Misma apariencia visual** – Idéntico diseño y estilos
- ✅ **Fácil de integrar** – Solo copia y pega en tu app
- ✅ **Listo para conectar datos reales** – Fácil reemplazar mocks con tu API

## 📁 Estructura

```
lotty-screens-export-ui-only/
├── README.md                    ← Este archivo
├── app/
│   ├── page.tsx                 ← Página principal (sin MiniKit)
│   ├── layout.tsx               ← Layout sin Providers blockchain
│   └── dashboard/
│       └── page.tsx             ← Redirección
├── components/
│   ├── LottyDashboard.tsx      ← Dashboard principal
│   ├── TicketPurchase.tsx      ← Compra (con botones mock)
│   ├── TicketList.tsx          ← Lista con datos mock
│   ├── UserStats.tsx           ← Stats con datos mock
│   ├── PrizePool.tsx           ← Premio mock
│   ├── DrawCountdown.tsx       ← Countdown mock
│   ├── DrawHistory.tsx         ← Historial mock
│   └── ShareButton.tsx         ← Compartir (sin Farcaster)
├── styles/
│   └── globals.css             ← Mismos estilos
└── lib/
    └── utils.ts                ← Utilidad cn()
```

## 🚀 Cómo usar

### 1. Copiar archivos

Copia el contenido de esta carpeta en tu app Next.js:

```bash
# Copiar estructura completa
cp -r lotty-screens-export-ui-only/app src/
cp -r lotty-screens-export-ui-only/components src/
cp -r lotty-screens-export-ui-only/styles src/
cp -r lotty-screens-export-ui-only/lib src/
```

### 2. Dependencias mínimas

Solo necesitas estas dependencias básicas:

```json
{
  "dependencies": {
    "next": "^15.2.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.15",
    "typescript": "^5.8.2"
  }
}
```

### 3. Configurar Tailwind

Asegúrate de tener `tailwind.config.js` y `postcss.config.js` configurados. El `globals.css` ya incluye todo lo necesario.

### 4. Configurar alias (opcional)

Si usas alias `~` en tu proyecto, asegúrate de tener en `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

O reemplaza `~/` por `@/` o tu alias preferido en todos los archivos.

## 📝 Datos Mock

Los componentes usan datos mock. Para conectar datos reales:

### UserStats
- Reemplaza `mockUserStats` en `UserStats.tsx` con tu hook/API

### TicketList
- Reemplaza `mockTickets` en `TicketList.tsx` con tu fuente de datos

### PrizePool
- Reemplaza `mockPrizeAmount` en `PrizePool.tsx` con tu API

### DrawCountdown
- Reemplaza el cálculo mock con tu lógica de countdown real

### DrawHistory
- Reemplaza `mockDraws` en `DrawHistory.tsx` con tu API de historial

## 🎯 Ejemplo: Conectar datos reales

```tsx
// En UserStats.tsx, reemplazar:
const mockData = mockUserStats(address);

// Por:
const { data } = useSWR(`/api/user/${address}`, fetcher);
const stats = data || defaultStats;
```

## 🎨 Personalización

### Colores
Edita `styles/globals.css` para cambiar la paleta de colores.

### Fuentes
En `app/layout.tsx`, cambia las fuentes Bungee por las tuyas:

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

### Logo
Cambia el emoji 🎰 en `LottyDashboard.tsx` por tu logo:

```tsx
<img src="/logo.png" alt="Lotty" className="h-8 w-8" />
```

## ⚠️ Notas

- **Wallet**: Los componentes de wallet están deshabilitados. Si necesitas wallet, instala OnchainKit/Wagmi y usa la versión completa.
- **Transacciones**: Los botones de compra/retiro muestran alertas mock. Conecta con tu sistema de transacciones.
- **ShareButton**: El botón de compartir muestra un alert mock. Conecta con tu sistema de sharing.

## 🔄 Migrar a versión completa

Si más adelante quieres conectar blockchain:

1. Instala dependencias: `@coinbase/onchainkit`, `wagmi`, `viem`
2. Copia `app/providers.tsx` de la versión completa
3. Reemplaza los componentes mock por los que usan hooks de Wagmi
4. Añade `lib/abis.ts` con tus ABIs de contratos

## 📦 Archivos incluidos

- ✅ Todas las pantallas visuales
- ✅ Estilos completos (Tailwind + CSS custom)
- ✅ Animaciones y efectos
- ✅ Responsive design
- ✅ Estados de carga y vacío
- ✅ Interacciones UI (tabs, botones, etc.)

¡Listo para usar! 🎉
