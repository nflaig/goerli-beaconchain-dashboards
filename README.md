# goerli-beaconchain-dashboards

Create [beaconcha.in dashboards](https://goerli.beaconcha.in/dashboard) based on deposit data.

```sh
node index.js deposit-data.txt
```

**How it works**

It first fetches all validator indexes based on public keys in deposit data, then creates dashboard URLs (max. 100 validators per dashboard)
and finally opens all dashboards in chrome.

Validators which are not on the beacon chain due to a missing deposit will be skipped.

Multiple records in deposit data file need to be separated by line breaks.
