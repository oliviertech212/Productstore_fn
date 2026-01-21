# Product Management Frontend

A modern, responsive product management system built with Next.js 15, TypeScript, and Tailwind CSS. Features a beautiful dashboard with green/yellow theme, authentication, and full CRUD operations for products.

## Live Demo

- **Frontend**: https://productstore-fn.vercel.app/
- **Backend API**: https://productstore-bn.onrender.com/api

## Demo Login Credentials

```
Email: oliviertechadmin@yopmail.com
Password: admin123
```

## Features

### Design & UI
- **Modern Dashboard** with collapsible sidebar
- **Responsive Design** for all screen sizes
- **Beautiful Landing Page** with hero section and features
- **Professional Authentication** pages

### Dashboard Features
- **Real-time Statistics** calculated from product data
- **Product Management** with full CRUD operations
- **Data Tables** with sorting, pagination, and search
- **User Authentication** with JWT tokens

### Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **RTK Query** for API calls
- **Tailwind CSS** for styling
- **Responsive Components** with shadcn/ui

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/oliviertech212/Productstore_fn.git
cd Productstore_fn
npm install
npm run dev
```

### Environment Setup
```env
NEXT_PUBLIC_API_URL=https://productstore-bn.onrender.com/api
```

## Pages & Features

### Landing Page
- Hero section with statistics
- Features showcase
- Product grid with real data
- Professional footer

### Dashboard
- **Overview**: Real-time statistics
  - Total Products
  - Inventory Value
  - Active Products
  - Average Price
- **Products Management**: Full CRUD operations
- **Responsive Sidebar**: Collapsible navigation

## Design System

### Colors
- **Primary Green**: `#22c55e`
- **Dark Green**: `#16a34a`
- **Yellow Accent**: `#fbbf24`
- **Dark Yellow**: `#f59e0b`

## API Integration

### Backend
- **URL**: https://productstore-bn.onrender.com/api
- **Repository**: https://github.com/oliviertech212/Productstore_bn

### Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /products` - Get products (paginated)
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /products/public` - Public products

## Deployment

**Live on Vercel**: https://productstore-fn.vercel.app/

### Build Commands
```bash
npm run build
npm start
```

## Development

### Tech Stack
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **API Client**: RTK Query
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

---

**Built with ❤️ by OlivierTech**