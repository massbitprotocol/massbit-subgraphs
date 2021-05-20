# Event Handler
If you're using graph-node (Rust) indexer seprately, run:
```
cargo run -p graph-node --release --   --postgres-url postgresql://graph-node:let-me-in@localhost:5432/graph-node   --ethereum-rpc testnet:https://data-seed-prebsc-1-s1.binance.org:8545/   --ipfs 127.0.0.1:5001
```

If you're using graph-node with docker-compose, run:
```
   graph-node:
     environment:
       ethereum: 'testnet:https://data-seed-prebsc-1-s1.binance.org:8545'
```

The contract we are using is from: https://testnet.bscscan.com/address/0x124818053f511a1baae5ad753e3526b9caa433ab#code

We can use any verified contract from: https://testnet.bscscan.com/contractsVerified