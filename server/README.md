##GameServer


**Requirements:**
* python 2.7
* tornado 3.2


For test script:
* websocket-client 0.13


Usage:
```sh
python server.py
```


**Accepted parameters:**


Parameter | Default | Meaning
--- | :---: | ---
`--help` | N/A | Print all available options
`--port` | 8000 | Run server on the given port
`--log`  | 30(WARNING) | Specifying the level of detail displayed


Example:
```sh
python server.py --port=5042
```