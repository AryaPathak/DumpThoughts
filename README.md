# DumpThoughts
Social Media Application

Where one can post their thoughts, to their followers, to the world. 
Can also go anonymous...

# DumpThoughts

A social media platform built using **Next.js**, **TypeScript**, **Redux**, **Tailwind CSS**, **GraphQL (Apollo)**, **Node.js (Express)**, and **PostgreSQL**.

## Features

- User authentication (Login & Signup)
- Secure password handling
- JWT-based authentication
- Create, update, and delete posts
- Responsive dark-mode UI
- State management with Redux
- GraphQL API with Apollo

## Tech Stack

### Frontend
- Next.js (React framework)
- TypeScript
- Redux (State Management)
- Tailwind CSS (Styling)

### Backend
- Node.js with Express
- GraphQL (Apollo Server)
- PostgreSQL (Database)

## Installation

### Prerequisites
Make sure you have **Node.js**, **PostgreSQL**, and **Yarn/NPM** installed.

### Clone the Repository
```bash
$ git clone https://github.com/your-username/DumpThoughts.git
$ cd DumpThoughts
```

### Install Dependencies
```bash
$ npm install   # or yarn install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dumpthoughts
JWT_SECRET=your_secret_key
```

### Run the Project
#### Start the Backend
```bash
$ npm run dev  # Runs the Express server
```

#### Start the Frontend
```bash
$ npm run dev  # Runs the Next.js frontend
```

### Access the Application
- **Frontend**: `http://localhost:3001/`
- **Login Page**: `http://localhost:3001/access`
- **API Endpoint**: `http://localhost:3000/graphql`

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

## License
This project is licensed under the MIT License.
