# Mini Dashboard

A modern, animated, and responsive dashboard built with Next.js, React, and Tailwind CSS. Features include dynamic data visualization, advanced search/filter, CSV export, admin settings, and more.

## Features

-   Animated cards, charts, and sidebar
-   Dynamic posts and users count (fetched from API)
-   Animated sparkline and big chart (Chart.js)
-   Pie chart for data distribution
-   Responsive sidebar with icons and collapse/expand
-   Posts page with pagination, animated cards, and search
-   Users page with advanced search, filter, sort, and CSV export
-   Modal for user details
-   Admin settings page (demo controls)
-   Performance optimizations (lazy loading, code splitting)
-   Styled console welcome message

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_API_URL="https://jsonplaceholder.typicode.com"
NEXT_PUBLIC_URL=http://localhost:3000
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

-   Update API endpoints in `.env.local` as needed
-   Add more admin controls in `src/app/settings/page.tsx`
-   Extend charts and analytics in `src/components/`

## Credits

-   Built by Susmoy Debnath
-   Powered by Next.js, React, Tailwind CSS, Chart.js, Framer Motion

## License

MIT
