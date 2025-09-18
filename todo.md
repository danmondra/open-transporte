## Database
- PostgreSQL
  We'll need to store:
  - Users
  - User's Trips (payments)
  - Routes
  - Prices of routes
  - Transportation Systems
  - Prices of transportation systems
  - Social programs by Goverment

## BackEnd
We will have two different types of users, one for the
common user (the one who uses public transport), and
the second is the goverment.

### Common user
- User authentication and authorization (we can use better-auth in JS/TS)
  We should be able to have our own table of users and a special ID
  to the user that better-auth creates in its own way.
- The next endpoints:
  - /trips/{start|end|id} (GET, POST) [When a trip starts and ends here is saved, here is where open payments is implemented]
  - /fares/estimate?from=A&to=B (GET, POST) [the cost estimation, maybe this could be a frontend responsability]
  - /profiles/{id}/benefits (GET) [the user can get info about itself and the public programs that is part of]
  - /transport-systems/{id} (GET) [the list, prices and info of available transport systems]
  - (maybe) /route [public info about the flow, demand and offert of public transport]
  - (maybe) /cities [public info about theflow, demand and offert of public transport]

### Goverment
  - Auth (and maybe RBAC)
  - /routes (GET)
  - /social-programs (POST, GET) [to set the criterias for people who receives the programs or rewards]
  - (statistics) specific endpoints for specific statistics, like traffic, or flow, etc.
