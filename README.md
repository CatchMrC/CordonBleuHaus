# Cordon Bleu Haus - Restaurant Information System

A modern, interactive restaurant information system that allows customers to view the restaurant's details, location, and menu, while providing an easy-to-use admin interface for menu management.

## Features

- Interactive restaurant information page
- Location and contact information display
- Categorized menu display
- Admin interface for menu management
- Clean and modern UI design

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
cordon-bleu-haus/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js application
├── README.md              # Project documentation
└── .gitignore            # Git ignore file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add necessary environment variables

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## License

MIT 