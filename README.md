# cryptocurrencies-viewer

"Cryptocurrencies Viewer" is an app for tracking cryptocurrency market data in real-time.

## Table of Contents

- [cryptocurrencies-viewer](#cryptocurrencies-viewer)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technical Highlight](#technical-highlight)
  - [Usage & Testing](#usage-test)
  - [Exploration](#exploration)

## Introduction

"Cryptocurrencies Viewer" is a real-time cryptocurrency market data tracking web app built with React. Users can explore various cryptocurrencies and access detailed information about them.

## Features

- Users can monitor the latest price data and trends over the past 7 hours, 24 hours, and 7 days, including price changes, trading volume, market capitalization, Circulating Supply, Total Supply and max Supply.
- Data is automatically refreshed every 45 seconds to ensure real-time accuracy.
- The app offers a line chart diagram displaying the price trends over the last 7 days, providing valuable insights for users.
- A responsive page style enhances the user experience by adapting to various devices and screen sizes, providing users with greater comfort and convenience.
- Data caching for a specific period allows for persistent reading and retrieval of information over time.

## Technical Highlight
- Leveraged RTK (React Toolkit). It's offers a centralized state management solution that is both adaptable and easy to expand, with flexible "slices" for managing different parts of the application's state.
- Implemented RTKQ (React Toolkit Query) for fetch the data from backend API.
- Utilsed Echart to draw the line map for recent 7 days.
- Combining Material Design and SASS styles results in a visually appealing and customizable user interface.
- The adoption of a function separation architecture reduces dependencies and enhances modularity.

## Usage & Testing

- Run `npm start` to run the app
- Run `npm start` to run the test

## Exploration
- Using DataGridPro to achieve a better-responsive layout for web pages. (eg. Stick the first column)
- Expanding and providing more detailed data for cryptocurrencies.
- Adding a side project for health checks to monitor the website and API in order to prevent downtime.
- Implementing dynamic data reading for the backend to display real-time updates.

