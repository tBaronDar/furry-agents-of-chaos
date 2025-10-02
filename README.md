# Furry Agents of Chaos (or FAC)

Welcome to Furry Agents of Chaos!

A delightful React web application dedicated to celebrating our feline friends. Browse through adorable cat images, explore different breeds, and curate your personal collection of favorite cats. No registration required - this app uses a pseudo-login system with local storage to remember your preferences seamlessly.

From majestic Maine Coons to sleek Siamese, discover the diverse world of cats through beautiful imagery and detailed breed information. Perfect for cat lovers, aspiring pet owners, or anyone who enjoys the charm of our furry companions.

## Tech Stack

- React with typescript
- Vite for local dev and app creation
- ESLisnt and prettier for code quality
- Material(MUI) for components
- Redux store for state managment and local storage
- axios for api calls
- Zod for validation
- pre-commit for linting, formatting and type checking

## TODO list

### Step 1, configuration

- [x] Setup prettierrc and eslint.config.ts
- [x] Create routes with react router
- [x] Create store and reducers
- [x] Create dtos
- [x] Use zod for api data validation
- [x] Create .env and get all relevant env variables
- [x] Create skeleton pages for each route
- [x] Install pre-commit

### Step 2, presentation

- [x] Create a dev branch to work on(if app uploaded to Vercel, dont run CI/CD with each git push)
- [x] Create a user/guest type that persists(local storage) to keep track of favorite cats(pseudo-loggin)
- [x] Flesh out pages and modals
- [x] Create catlist route and respective modals
- [x] Create breedlist route and respective modals
- [x] Create favorites route
- [x] Create about page

### step 3, error handling loading state handling

- [x] Deploy to Vercel
- [x] Use Loading spinner to handle loading state
- [x] Use toast to display errors, gracefully handle errors

### step 4, clean up

- [x] eliminate used types/files/routes
- [x] replace vite logo svg and title
- [x] finalize README
