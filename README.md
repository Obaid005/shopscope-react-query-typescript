# 🛍️ ShopScope - Product Browser

A React TypeScript application for browsing and favoriting products with infinite loading and search functionality.

## ✨ Features

### 🎯 Core Functionality

- **Product Grid**: Responsive card layout displaying products with images, titles, and prices
- **Infinite Loading**: "Load More" button for paginated product loading
- **Search with Debounce**: Real-time search with 400ms debounce to avoid excessive API calls
- **Favorites System**: Heart toggle to favorite/unfavorite products
- **Persistent Favorites**: Favorites are saved to localStorage and persist across page refreshes

### 🛠️ Technical Features

- **React Query**: Modern data fetching with caching and infinite queries
- **TypeScript**: Full type safety throughout the application
- **Styled Components**: All styling using styled-components
- **Context API**: Shared state management for favorites (no Redux needed)
- **Error Handling**: Graceful error handling for API calls and localStorage operations
- **Race Condition Prevention**: Proper loading states to prevent localStorage race conditions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn

# Start development server
yarn dev
```

The application will be available at `http://localhost:5174/`

## 📁 Project Structure

```
src/
├── components/
│   ├── AppContent.tsx           # Main application content and layout
│   ├── ui/
│   │   ├── ProductGrid.tsx      # Main product grid with infinite loading
│   │   ├── ProductCard.tsx      # Individual product card component
│   │   └── SearchBar.tsx        # Search input with debounce
│   └── styled/
│       ├── CardStyles.ts        # Product card styling
│       ├── GridStyles.ts        # Grid layout styling
│       └── SearchStyles.ts      # Search bar styling
├── context/
│   └── FavouritesContext.tsx    # Favorites state management with localStorage
├── hooks/
│   └── useProducts.ts           # React Query hook for product data
├── services/
│   └── product.service.ts       # API service functions
├── types/
│   └── product.ts               # TypeScript interfaces
├── utils/
│   ├── constants.ts             # Application constants
│   └── storage.ts               # localStorage utility functions
├── styles/
│   └── global.ts                # Global styles
└── App.tsx                      # Main app component with providers
```

## 🔧 Key Implementation Details

### Favorites Persistence & Race Condition Fix

- **localStorage Key**: `"shopscope_favorites"`
- **Race Condition Problem**: Components accessing favorites before localStorage loads
- **Solution**: Loading state prevents premature access and saves
- **Loading Flow**:
  1. Start with `isLoading = true`
  2. Load favorites from localStorage in `useEffect`
  3. Set `isLoading = false` when data is ready
  4. Only save to localStorage when `isLoading = false`
- **Error Handling**: Graceful fallbacks for localStorage failures
- **Visual Feedback**: Loading indicator (⏳) during initial load

### Search & Pagination

- **Debounced Search**: 400ms delay to reduce API calls
- **Infinite Loading**: Works seamlessly with search
- **Cache Management**: Separate cache entries for different search terms
- **Automatic Refetch**: When search term changes

### Performance Optimizations

- **React Query Caching**: Automatic cache management for API responses
- **Debounced Search**: Reduces unnecessary API calls
- **Optimized Re-renders**: Proper state management and memoization
- **Lazy Loading**: Product images load as needed

## 🎨 UI Features

- **Responsive Design**: Grid adapts to different screen sizes
- **Loading States**: Visual feedback during data fetching and localStorage operations
- **Error Handling**: User-friendly error messages
- **Favorites Counter**: Shows number of favorited products in header
- **Heart Toggle**: Visual favorite/unfavorite with emoji indicators
- **Loading Indicators**: Prevents incorrect UI states during data loading

## 🔌 API Integration

Uses the DummyJSON API:

- **Base URL**: `https://dummyjson.com`
- **Products**: `GET /products?limit=12&skip={offset}`
- **Search**: `GET /products/search?q={query}&limit=12&skip={offset}`

## 🛡️ Error Handling

- **Network Failures**: Graceful handling of API request failures
- **localStorage Errors**: Fallback behavior when storage is unavailable
- **JSON Parsing**: Safe parsing with error recovery
- **Race Conditions**: Loading states prevent timing issues

## 🚨 Race Condition Prevention

The application includes robust handling of the localStorage race condition:

```typescript
// Problem: Components access favorites before localStorage loads
// Solution: Loading state prevents premature access

const [isLoading, setIsLoading] = useState(true);

// Only save when loading is complete
useEffect(() => {
  if (!isLoading) {
    setToStorage(FAVORITES_STORAGE_KEY, favoriteProducts);
  }
}, [favoriteProducts, isLoading]);

// Components show loading state until data is ready
{
  isLoading ? "⏳" : isFavorite ? "❤️" : "🤍";
}
```

## 📱 Browser Compatibility

- **Modern Browsers**: Full localStorage support
- **Responsive Design**: Mobile and desktop optimized
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🚀 Future Enhancements

- [ ] Add product categories filter
- [ ] Implement sorting options
- [ ] Add product detail pages
- [ ] Export favorites functionality
- [ ] Dark mode toggle
- [ ] Offline support with service workers
- [ ] Favorites sync across devices
