# Shop Detail Components

This folder contains components related to displaying detailed shop information, with a focus on location and map integration.

## Components

### MapSection

A component that displays a shop's location information and provides a visual map placeholder.

**Props:**

```typescript
interface MapSectionProps {
  location: {
    address: string;
    township: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    googleMapsUrl: string;
  };
}
```

**Usage:**

```jsx
import { MapSection } from '@/components/ShopDetail';

// ...

<MapSection location={shop.location} />
```

### ShopDetailWithMap

A comprehensive shop detail component that includes all shop information and integrates the MapSection component.

**Props:**

```typescript
interface ShopDetailWithMapProps {
  shop: Shop; // From @/lib/data
}
```

**Usage:**

```jsx
import { ShopDetailWithMap } from '@/components/ShopDetail';
import { shops } from '@/lib/data';

// ...

<ShopDetailWithMap shop={shops[0]} />
```

## Integration Notes

1. The `MapSection` component is designed to work with the `location` property from the `Shop` interface in `@/lib/data.ts`.

2. The `ShopDetailWithMap` component is a complete shop detail view that uses the full `Shop` interface from `@/lib/data.ts`.

3. For a demonstration of these components, see the demo page at `/shop-demo`.

## Future Enhancements

1. **Real Map Integration**: Replace the map placeholder with an actual map integration using a library like Google Maps, Mapbox, or Leaflet.

2. **Directions**: Add functionality to get directions to the shop location.

3. **Nearby Shops**: Show other shops that are near the current shop.

4. **Mobile Optimization**: Ensure the map is responsive and works well on mobile devices.
