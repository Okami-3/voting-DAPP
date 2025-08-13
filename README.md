# Voting DApp - A Full-Stack Decentralized Application

This is a full-stack decentralized voting application (DApp) built on Ethereum. It uses Hardhat for smart contract development and deployment, React as the frontend framework, and a simple Express.js server for the backend.

## ✨ Features

- **Admin Rights**: The contract deployer (Owner) has the sole permission to add candidates.
- **Add Candidate**: The admin can add new candidates to the voting system at any time.
- **Vote**: Any user (address) can vote, but each address can only vote once.
- **Get Candidate List**: Anyone can view the current list of all candidates and their respective vote counts.
- **View Winner**: Anyone can query the current winner with the highest number of votes.

## 🛠️ Tech Stack

- **Smart Contract**: Solidity, Hardhat, OpenZeppelin
- **Frontend**: React, Vite, Ethers.js, Axios
- **Backend**: Node.js, Express.js
- **Development Environment**: Node.js, npm

## 📋 Prerequisites

Before you begin, please ensure you have the following software installed locally:

- [Node.js](https://nodejs.org/) (v18.x or later)
- [NPM](https://www.npmjs.com/) (usually installed with Node.js)
- [MetaMask](https://metamask.io/) browser extension

## 🚀 Setup and Launch

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd voting-dapp
```

### 2. Configure and Deploy the Smart Contract (Hardhat)

First, we need to compile and deploy the `Voting` smart contract to a local Hardhat network.

```bash
# Navigate to the hardhat directory
cd hardhat

# Install dependencies
npm install

# Compile the smart contract
npx hardhat compile

# Start the local Hardhat node
npx hardhat node
```

This command starts a local Ethereum node and provides about 20 test accounts with their private keys.

**Open a new terminal** and run the deployment script:

```bash
# Ensure you are still in the hardhat directory
# Deploy the contract to the local network
npx hardhat run scripts/deploy.js --network localhost
```

After a successful deployment, you will see output similar to this in your terminal:

```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Voting contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Please copy and save the deployed contract address (`0x5Fb...`)**, as it will be needed in the following steps.

### 3. Configure and Start the Backend

The backend service is used to interact with the smart contract.

```bash
# Go back to the project root, then enter the backend directory
cd ../backend

# Install dependencies
npm install
```

In the `backend` folder, you might need a configuration file or to configure the contract address and ABI directly in `index.js`.
**Note**: To make the project work, you need to provide the contract ABI from `hardhat/artifacts/contracts/Voting.sol/Voting.json` and the contract address from the previous step to both the backend and the frontend.

Start the backend service (assuming the entry file is `index.js`):
```bash
node index.js
```

### 4. Configure and Start the Frontend

The frontend is the user interface for interacting with the DApp.

```bash
# Go back to the project root, then enter the frontend directory
cd ../frontend

# Install dependencies
npm install
```

In the frontend code (usually in a config file like `src/config.js` or directly in a component), you need to configure:
1.  **Contract Address**: Paste the address you saved in step 2.
2.  **Contract ABI**: Copy the ABI content from the `hardhat/artifacts/contracts/Voting.sol/Voting.json` file.

After configuration, start the frontend development server:

```bash
npm run dev
```

Now you can open the local address provided by Vite (usually `http://localhost:5173`) in your browser to interact with the DApp.

**Important Notes**:
- Ensure your MetaMask is connected to the Hardhat local network (usually `http://127.0.0.1:8545/`).
- You can use the test accounts by importing the private keys provided by the Hardhat node into your MetaMask.

## 📁 Project Structure

```
voting-dapp/
├── backend/         # Express.js Backend
├── frontend/        # React + Vite Frontend
└── hardhat/         # Solidity Smart Contracts and Scripts
```
