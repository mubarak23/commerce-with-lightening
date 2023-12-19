
# Commerce With Lightening Service

##  Backend Service for paying e-comerce product with bitcoin sats via bitcoin lightening network 


# How to run for local development
- Checkout to the `dev` branch

- In a terminal, run:
```npm install```

- Build :
```npm run build```

- Finally run:
```npm run start```

- setup .env using .env.example file 


### Key Features

- **Lightening Bitcoin Network API**: Use Alby Walletrobust API for Generating Invoice.
- **RESTful API**: A robust API allows for easy integration with other applications.
- **Marchant OnBoarding**: Once the Backend is deploy for a merchant, he only need to update his alby wallet address.
- **Marchant Profiles**: All invoice Generated will be payment that is going to the marchant that was setup at the point of deploying the backend.
- **Mail Confirmation once**: Once an invoice is paid, the seller get notify about it, buyer get a mail with the details about order

### Key API
- **/products**: fetch all product added by marchant on the system - GET REQUEST
- **/invoice**: generate an invoice base on buyer item in the carts - POST REQUEST

