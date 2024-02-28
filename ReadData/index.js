const express = require('express');
const app = express();
const Web3 = require('web3');
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_paymentId",
				"type": "uint256"
			}
		],
		"name": "claimPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "payId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "payId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "PaymentInitiated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "payId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentReverted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_paymentId",
				"type": "uint256"
			}
		],
		"name": "revertPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_timeAhead",
				"type": "uint256"
			}
		],
		"name": "sendPayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currPaymentId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			}
		],
		"name": "getReceivedPayments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "claimed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "reverted",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "paymentId",
						"type": "uint256"
					}
				],
				"internalType": "struct ETHEscrow.Payment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getSentPayments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "claimed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "reverted",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "paymentId",
						"type": "uint256"
					}
				],
				"internalType": "struct ETHEscrow.Payment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "payments",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "claimed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "reverted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "paymentId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivedPayments",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "claimed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "reverted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "paymentId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sentPayments",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "claimed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "reverted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "paymentId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const token_exchange_abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokensProvidedInWei",
				"type": "uint256"
			}
		],
		"name": "addOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "fiatProviderAddress",
				"type": "address"
			}
		],
		"name": "releaseOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "revertOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "orderCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "tokenProvider",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokensProvided",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "claimed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "reverted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "revertWindow",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddress = '0x4fe8e5aDF4B8cF79969f52973185029A1D1CcA78'; // Replace with your contract address
const tokenExchangeContractAddress = "0x6846Fff86FCC3e45F49796c28929cEAD7faBe0AB"

// Initialize web3 instance
const web3 = new Web3('https://sepolia.infura.io/v3/11782cb03f81433d86bb20d869cdd882'); // Replace with your Infura endpoint or any Ethereum node endpoint

// Initialize contract instance
const contract = new web3.eth.Contract(ABI, contractAddress);
const tecontract = new web3.eth.Contract(token_exchange_abi, tokenExchangeContractAddress);

// Define route to get sent payments for a particular address
app.get('/sentPayments/:address', async (req, res) => {
    const address = req.params.address;
    try {
        const result = await contract.methods.getSentPayments(address).call();
        const modifiedResult = result.map(innerList => innerList.map(item => typeof item === 'boolean' ? (item ? "1" : "0") : item));
        res.json(modifiedResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Define route to get received payments for a particular address
app.get('/receivedPayments/:address', async (req, res) => {
    const address = req.params.address;
    try {
        const result = await contract.methods.getReceivedPayments(address).call();
        const modifiedResult = result.map(innerList => innerList.map(item => typeof item === 'boolean' ? (item ? "1" : "0") : item));
        res.json(modifiedResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/allOrders', async (req, res) => {
    try {
        const orderCount = await tecontract.methods.orderCount().call();
		var orders = []
		for (let i = 0; i < orderCount; i++) {
			var order = await tecontract.methods.orders(i).call();
			orders.push(order);
		}
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/', (req, res) => {
    res.send('Welcome!');
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
