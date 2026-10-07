# Kilojoin

Kilojoin is coinjoin on BTC (BLAKE2b) from your own node. It meets other people in the same pools as the Kilowallet Android app, through relay.kilombino.com, so a StartOS server and a phone can mix together.

## Before you start

- **Bitcoin Knots (BLAKE2b)** installed and **fully synced**. Kilojoin waits for it. A pruned node is enough.

## Getting set up

1. Open Kilojoin's **Web UI**.
2. Choose **Import** and type the 12 or 24 words of a wallet you already have (and its passphrase, if it uses one), or choose **Create** and write the new words down on paper. They are shown only once.
3. Pick a password. It encrypts the words on this server and is asked each time you unlock the page. **Without the password the words cannot be recovered from the server, so keep the words on paper.**
4. Send BTC (BLAKE2b) to a **Receive** address, or wait for the first scan to find the coins the wallet already has.

## Mixing

- **Open a pool**: choose the amount every output will have (from 10,000 sats to 1 BTC), the fee rate and how many people. Other people see it in Kilowallet and on their own Kilojoin.
- **Join a pool**: pick one of the open pools and one of your coins. A coin worth the pool amount plus your fee share is marked **★ EXACT** and leaves no change.
- When the pool is full, or someone asks to close it, everyone votes. A "not yet" reopens the pool.
- Nothing is signed until you press **Sign**: Kilojoin checks that your mixed output and your change are in the transaction.
- Each person pays the same fee share. It is shown before you join.

## Notifications

New pools (on by default; untick the box in the Web UI to stop them), votes, "time to sign" and confirmations show up in StartOS's notifications panel.

## Backups

The StartOS backup holds the encrypted words, the wallet's address indexes and any round in progress. Restoring it still needs your password.

## Limitations

- The wallet is single-signature BIP84 (native SegWit, `bc1q…`). It is not a full wallet app: to spend mixed coins elsewhere, import the same words into Kilowallet or another BIP84 wallet on the BLAKE2b chain.
- Talking to the relay goes over clearnet from your server.
