import alpaca_trade_api as tradeapi;
import os;
from dotenv import load_dotenv;
import asyncio
import websockets


# api = tradeapi.REST(os.getenv("API_KEY"), os.getenv("SECRET_KEY"), base_url='https://paper-api.alpaca.markets') # or use ENV Vars shown below
# account = api.get_account()
# api.list_positions()
# aapl = api.alpha_vantage.historic_quotes('AAPL', adjusted=True, output_format='pandas')

# print(aapl)


async def hello(uri):
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello world!")

    hello('ws://localhost:8765')