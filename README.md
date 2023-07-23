## Getting Started
Copy repository

```bash
  git clone https://github.com/OSventukh/eliftech-delivery-app.git
```

Create `.env` file in the root directory with the following variables

`DATABASE_URL` - link to MongoDB 

`NEXT_PUBLIC_SITE_URL` - URL of your site.

`NEXTAUTH_URL` - URL of your site (you don't have to define this variable if deploy on Vercel)

`NEXTAUTH_SECRET` - Your secret code for jwt authentication

Install all dependencies with command

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

