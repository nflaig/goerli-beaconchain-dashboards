# goerli-beaconchain-dashboards

Create [beaconcha.in dashboards](https://goerli.beaconcha.in/dashboard) based on deposit data.

```sh
node index.js deposit-data.txt
```

and to open all dashboards in chrome

```sh
node open-dashboards.js 
```

**How it works**

It fetches all validator indexes based on public keys in deposit data and creates dashboard URLs (max. 100 validators per dashboard).

Validators which are not on the beacon chain due to a missing deposit will be skipped.

Multiple records in deposit data file need to be separated by line breaks.
