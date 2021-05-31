# Example Subgraph

An example to help you get started with The Graph. For more information see the docs on https://thegraph.com/docs/.

# Install
1. Run command: yarn link (on massbitprotocol/graph-cli project and massbitprotocol/graph-ts project).
2. Get name from step one and add yarn link "{paste name here}" on the massbit-subgraphs/index-timestamp project.
3. Start custom graph node inside massbitprotocol/indexer (by docker).
4. Open graph node project (graphprotocol/graph-node) to use unit test.
    4.1 Run command: export THEGRAPH_STORE_POSTGRES_DIESEL_URL="postgresql://postgres:postgres@localhost:5432/graph_node"
    4.2 Run command: cargo test // cargo test // cargo test  -- --nocapture // cargo test {function name} -- --nocapture 

# Test generate wasm
1. Open massbit-subgraphs/index-timestamp project 
2. Run command: yarn codegen
3. Run command: yarn build
4. Run command: cp build/MasterChef/big_int_to_hex2.wasm ../../graph-node/runtime/wasm/wasm_test/