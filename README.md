# Free Share API

### Intro

This API does the following:
1. Allows company that owns the API to buy a selection of shares which they can then use to distribute to users.
2. Allows company to distribute these shares to the users when the API is hit.

### How it works

The buy-daily-shares endpoint will purchase a chosen amount of shares that is based on a Cost Per Acquisition (CPA), as well as limits for min/max value of shares.

The algorithm calculates the current CPA and chooses the following value that will push the CPA toward the desired CPA. It then places these values into persistent storage (which in this case is just a JSON file).

When hit, the claim-free-share endpoint randomly selects a value from the storage source and distributes it to the user.

The method means that all the complex and potentially time-consuming tasks are handled by the buy-daily-shares endpoint, which will not be hit by users.

**Note: the algorithm falls over if the chosen CPA is above/below any of the available shares for purchase. This edge case would need to be handled.

## How to run

I used Yarn for this project since this is what Tsoa requires.

a .env file is also required. Please copy the contents of the env.example.

If you wish to change the shares that are available for purchase, please modify the contents of the example-broker-assets.json.

To run tests:

```
yarn test
```

To use the app, it is easiest to build a Docker image and run that, so I'd recommend having Docker Desktop or something similar.

To build:

```
yarn build-docker-image
```

To run:

```
yarn run-docker-image
```

### Endpoints

Once running, the coolest way to play with the endpoints is to use the Swagger docs that Tsoa generates from the interfaces used. Find this at:

```
http://localhost:3000/docs/
```

To purchase shares (this has to be hit first otherwise there are no shares to distribute):
```
http://localhost:3000/get-daily-shares
```
Example body:
```json
{
  "numberOfSharesToPurchase": 0
}
```

To distribute shares
```
http://localhost:3000/claim-free-share
```
Example body:

```json
{
  "userId": "can be any string"
}
```

### How to validate this is working

When you hit the endpoints, check the console logs to see what is going on.

### How would this algorithm change if we allowed partial shares?

If this were allowed, then on average each share would approximately half in value (assuming 1 whole share is the max allowed).

Consequently, the algorithm could remain the same but could select the share to use based on half of it's value. I think this would make the results more volatile but should average out in the same way.

### Next steps for this project

The main next step I can think of would be adding in a database implementation (as currently uses a mock db).

This would likely be postgres or something similar. I'd use Prisma as the server side library to interact with the db as it keeps the type safely, so works well with TypeScript.
