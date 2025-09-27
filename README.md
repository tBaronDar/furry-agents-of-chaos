# Furry Agents of Chaos (or FAC)

## Tech Stack WIP

- ESLisnt and pretier for code quality
- Material (mui) for components
- Redux store for state managment
- axios for api calls
-

## TODO list WIP

### Step 1, configuration

- [x] setup prettierrc and eslint.config.ts
- [x] create routes with react router
- [x] create store and reducers
- [x] create dtos
- [x] use zod for api data validation
- [x] create .env and get all relevant env variables
- [x] create skeleton pages for each route
- [x] install pre-commit

### Step 2, presentation

- [x] create a dev branch to work on(if app uploaded to Vercel, dont run CI/CD with each git push)
- [x] create a user/guest type that persists(local storage) to keep track of favorite cats(pseudo-loggin)

- [ ] flesh out pages and modals
- [ ] catlist route and respective modals
- [ ] breedlist route and respective modals
- [ ] favorites route
- [ ] about page

### step 3, error handling loading state handling

- [ ] see if app can easily by linked to Vercel
- [ ] use Loading spinner to handle loading state
- [ ] use toast? popoup? to display errors, gracefully handle errors
- [ ] use a mapper to handle bad incoming data

### step 4, clean up

- [ ] finalize README
- [ ] eliminate used types/files/routes
- [ ] replace vite logo svg
