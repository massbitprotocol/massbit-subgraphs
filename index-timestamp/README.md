# Example Subgraph

An example to help you get started with The Graph. For more information see the docs on https://thegraph.com/docs/.

# Install
1. Run yarn link on massbitprotocol/graph-cli project and massbitprotocol/graph-ts project.
2. Get name from step one and add yarn link "{paste name here}" on the massbit-subgraphs/index-timestamp project.
3. Start custom graph node inside massbitprotocol/indexer (by docker).
4. Open graph node project (graphprotocol/graph-node) to use unit test.
    4.1 Run export THEGRAPH_STORE_POSTGRES_DIESEL_URL="postgresql://postgres:postgres@localhost:5432/graph_node"
    4.2 Run cargo test // cargo test // cargo test  -- --nocapture // cargo test {function name} -- --nocapture