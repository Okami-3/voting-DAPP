const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

// --- CONFIGURATION --- 
// IMPORTANT: You must fill in these values after deploying your contract.
// 1. The RPC URL of the network you deployed to. For a local Hardhat node, this is the default.
const RPC_URL = 'http://127.0.0.1:8545/';
// 2. The address of your deployed Voting contract.
const CONTRACT_ADDRESS = ''; // <-- PASTE YOUR DEPLOYED CONTRACT ADDRESS
// 3. The ABI of your Voting contract.
const CONTRACT_ABI = []; // <-- PASTE YOUR CONTRACT ABI

// --- Ethers.js Setup ---
const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// --- API Endpoints ---
app.get('/api/candidates', async (req, res) => {
    try {
        const candidates = await contract.getCandidates();
        // The contract returns an array of structs. We format it for easier use in the frontend.
        const formattedCandidates = candidates.map(c => ({
            id: Number(c.id),
            name: c.name,
            voteCount: Number(c.voteCount)
        }));
        res.json(formattedCandidates);
    } catch (error) {
        console.error("Error fetching candidates:", error);
        res.status(500).send('Error fetching candidates');
    }
});

app.get('/api/winner', async (req, res) => {
    try {
        const winner = await contract.getWinner();
        const formattedWinner = {
            id: Number(winner.id),
            name: winner.name,
            voteCount: Number(winner.voteCount)
        };
        res.json(formattedWinner);
    } catch (error) {
        console.error("Error fetching winner:", error);
        res.status(500).send('Error fetching winner');
    }
});

// --- Event Listener --- 
function setupEventListeners() {
    contract.on('Voted', (candidateId, voter) => {
        console.log('--- Event: Voted ---');
        console.log(`  Voter: ${voter}`);
        console.log(`  Candidate ID: ${candidateId}`);
        console.log('--------------------');
        // Here you could add logic to save this data to a database.
    });
    console.log('Event listener for "Voted" event is set up.');
}

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
    if (CONTRACT_ADDRESS !== 'YOUR_CONTRACT_ADDRESS_HERE' && CONTRACT_ABI.length > 0) {
        setupEventListeners();
    } else {
        console.warn('Contract address and ABI not provided. Event listener is not active.');
    }
});
