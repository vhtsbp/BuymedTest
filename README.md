## 🚀 How to Run the Project

Follow the steps below to run the React Native project locally.

### 📦 Install Dependencies

```bash
npm install
# or
yarn install

### IOS
cd ios && pod install && cd ..
npx react-native run-ios

### Android
npx react-native run-android
```

## 📶 Offline Behavior

The app supports **offline-first behavior** using **TanStack React Query**, **AsyncStorage persistence**, and **NetInfo**.

### 🌐 Network Awareness
Network status is tracked via `@react-native-community/netinfo` and connected to React Query using `onlineManager`.

- Queries are **paused when offline**
- Queries **resume and retry** when back online

### 💾 Cache Persistence
Query cache is persisted to `AsyncStorage` using `PersistQueryClientProvider`.

- Cached data is available after app restart
- Cached data is shown while offline

### 🔁 Query Behavior

| State | Behavior |
|------|----------|
| Offline + cache exists | Show cached data |
| Offline + no cache | Query is paused |
| Back online | Queries refetch automatically |

### ⚠️ Notes
- Mutations are **not persisted**
- Offline mutations require custom handling
- Cache can be invalidated via `buster` version `buster: 'v1.0.0'` (buster change => invalidated cache)

## 🗄️ Data Fetching, Caching, and Pagination

### Why Cache Data?

- **Smooth UX:** Caching ensures that users see data instantly when navigating or returning to a screen, even with slow or unstable networks.
- **Offline Support:** Cached data is available when offline, providing a seamless experience.
- **Reduced Network Usage:** Avoids unnecessary API calls by serving data from cache when possible.

### How Data Fetching & Caching Works

- **React Query** is used for all data fetching and caching.
- The query cache is persisted to `AsyncStorage` (see [Offline Behavior](#offline-behavior)), so data survives app restarts.
- Queries use a `staleTime` (e.g. 5 minutes) to control how long data is considered fresh. During this time, navigation or refocus will not trigger a refetch.
- When the device is offline, queries are paused and cached data is shown. When back online, queries automatically refetch if needed.

### Why use `useInfiniteQuery`?

- **Pagination/Load More:** `useInfiniteQuery` enables efficient "load more" pagination, fetching data in pages as the user scrolls.
- **Memory Efficiency:** Only a subset of data is loaded at a time, reducing memory usage for large lists.
- **Consistent API:** Handles page tracking, loading state, and cache for each page automatically.

### Example: Product List Pagination

```typescript
export const useGetProducts = () => {
  const PAGE_SIZE = 20;
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => {
      return getProducts({ skip: pageParam, limit: PAGE_SIZE });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    retry: 2, // Retry twice on network error
    retryOnMount: true, // Retry when coming back online
    refetchOnReconnect: true, // Refetch if network reconnects
  });
};