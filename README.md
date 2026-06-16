# MyFinBank Frontend

Angular frontend for MyFinBank Vehicle Loan Management System.

## Run

```bash
npm install
ng serve -o
```

Default API Gateway URL is configured in:

```text
src/environments/environment.ts
```

Default:

```ts
apiBaseUrl: 'http://localhost:8070'
```

If your API Gateway is running on `8080`, change it there.

## Backend Run Order

1. discovery-server
2. api-gateway
3. auth-service
4. emi-service
5. loan-service
6. workflow-service
"# myFinBankBackend_1" 
