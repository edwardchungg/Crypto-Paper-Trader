# Crypto-Paper-Trader
A localStorage-based cryptocurrency paper trading web application. Currently Work-in-Progress 
 **Cryptotrader V1.0 **

## Cryptocurrency Supported

* [Bitcoin](https://www.coindesk.com/price/bitcoin)
* [Chainlink](https://www.coindesk.com/price/chainlink)
* [Dogecoin](https://www.coindesk.com/price/dogecoin)
* [Ethereum](https://www.coindesk.com/price/ethereum)
* [Litecoin](https://www.coindesk.com/price/litecoin)

## Features

#### Coin Modules
* Displays current coin market prices
* Refreshes prices every 30 seconds
* Displays returns as $ and % (be it positive or negative)
* Displays returns as green when positive and red when negative
* Displays returns for both the total portfolio and for each cryptocurrency
* Displays both total cash and total equity 

#### Simulate Real Orders
* Simulate buy/sell orders using real-time market prices
* Start off with $1,000,000
* Will not allow buy/sell orders that exceed respective cash/equity requirements.
* Will properly weight average costs in accordance to current and new equity acquired.
* Will display the current price of the coin selected
* Will display the total cost of the order

#### Orders Table

* Displays history of orders placed
* Table will populate with OrderID, OrderType, Cryptocurrency, Quantity, Price, and TotalCost
* Orders will be displayed in chronological order
* Buy orders = Green
* Sell orders = Red

## How long will my data be stored?

Data is stored in localStorage, which means that it will forever be stored in ur browser's local history until you:
*   Delete history
*   Delete cookies
*   Clear localStorage
*   Click Reset button

## Technologies Used
* **HTML**
* **CSS**
* **Javascript**
