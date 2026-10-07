<p align="center">
  <img src="icon.png" alt="Kilojoin Logo" width="21%">
</p>

# Kilojoin on StartOS

> Everything not listed in this document should behave the same as upstream
> Kilojoin. If a feature, setting, or behavior is not mentioned here, the
> upstream README is accurate and fully applicable.

[Kilojoin](https://github.com/Kilombino/kilojoin) is coinjoin on BTC (the BLAKE2b chain) from a home node. It is the coinjoin of the [Kilowallet](https://github.com/Kilombino/kilowallet) Android app, run as a server: same protocol, same code (Kilowallet is a git submodule of Kilojoin), and the same Nostr relay, `relay.kilombino.com`, so servers and phones meet in the same pools.

- **Upstream repo:** <https://github.com/Kilombino/kilojoin>
- **Wrapper repo:** <https://github.com/Kilombino/kilojoin-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One image, built from the `kilojoin` submodule's `Dockerfile`: the jar is compiled with Gradle on the build machine's platform and copied onto `eclipse-temurin:17-jre` for each architecture.

| Property      | Value                                              |
| ------------- | -------------------------------------------------- |
| Image         | `kilojoin` (Dockerfile build, `kilojoin/Dockerfile`) |
| Architectures | x86_64, aarch64                                    |
| Command       | `java -Xmx256m -jar /opt/kilojoin/kilojoin.jar`    |

| Subcontainer | Purpose                                         |
| ------------ | ----------------------------------------------- |
| `kilojoin`   | The `kilojoin` daemon — the one to `attach` to |

## Volume and Data Layout

| Volume | Mount Point | Purpose                       |
| ------ | ----------- | ----------------------------- |
| `main` | `/data`     | Wallet, rounds and settings   |

| File            | Contents                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------- |
| `vault.json`    | The BIP-39 words and passphrase, encrypted with the user's password (PBKDF2-SHA256, 600,000 rounds, then AES-GCM) |
| `wallet.json`   | The account xpub's address indexes in use (receive and change)                                    |
| `sessions.json` | Pools this server is in: terms, seats, votes, signatures                                          |
| `settings.json` | The xpub, whether new pools notify, the last pool seen                                            |
| `startos-store.json` | Which node: `auto`, `knots-blake2b` or `bitcoind` (package state, not Kilojoin's)              |

The chosen node's `main` volume is also mounted, **read-only**, at `/mnt/node`, for its RPC cookie.

## File Models

None. Kilojoin writes its own files; the package configures it through environment variables only (`KILOJOIN_DATA`, `KILOJOIN_PORT`, `BITCOIN_RPC_URL`, `BITCOIN_RPC_COOKIE`).

## Dependencies

One of two BLAKE2b nodes, both declared optional and enabled by the choice in `startos-store.json` (`auto` by default):

| Dependency | Kind | Health checks required | RPC (host `rpc`) |
| ---------- | ---- | ---------------------- | ---------------- |
| `knots-blake2b` (Bitcoin Knots (BLAKE2b) Companion), `>=1.0.0:30` | running | `node`, `sync-progress` | port 18443 |
| `bitcoind` (Bitcoin on the BLAKE2b chain, e.g. Knots from the POW branch of Retropex/knots-startos), `*` | running | `bitcoind`, `sync-progress` | port 8332 |

`auto` uses `knots-blake2b` when it is installed, otherwise `bitcoind`. Because `bitcoind` is also the id of SHA256d Bitcoin, the `chain` oneshot asks the node `getdeploymentinfo` and starts Kilojoin only if `blake2b` (or rc2's `hardfork`) is active; otherwise it exits with an error saying the node is not on BLAKE2b.

The RPC address comes from `sdk.host.getBridgeAddress` on the chosen node's `rpc` host. Credentials are its `.cookie`, from a read-only mount of its `main` volume, re-read on every call. A pruned node works: nothing needs `txindex`.

## Network Access and Interfaces

| Interface | Id   | Type | Port | Description                          |
| --------- | ---- | ---- | ---- | ------------------------------------ |
| Web UI    | `ui` | ui   | 8080 | Your wallet and your coinjoin pools  |

Outbound, Kilojoin opens a WebSocket to `wss://relay.kilombino.com` (pool announcements, kind 32022, and NIP-44 encrypted round messages, kind 2023). It is the only outside connection.

## Installation and First-Run Flow

Nothing is configured from StartOS. The first visit to the Web UI asks either to **import** BIP-39 words (12 or 24, optional passphrase) or to **create** new ones (shown once), plus a password of at least 8 characters. Every later visit asks for the password; a wrong one is answered after 1.5 s. The decrypted words are kept in memory only while the page is unlocked; **Lock** forgets them. After a restart the words stay encrypted until someone unlocks, but rounds already joined keep running and the server can still vote; signing needs an unlock.

## Actions

**Choose BLAKE2b node** (`choose-node`): Automatic, Bitcoin Knots (BLAKE2b) Companion, or Bitcoin (bitcoind). Writes `startos-store.json`; the dependency and main follow it. Safe to repeat; the wallet is untouched.

## Tasks

None.

## Health Checks

| Check           | Meaning                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------- |
| Web Interface   | Port 8080 is listening                                                                        |
| Notifications   | Every 20 s, reads new events from `http://127.0.0.1:8080/internal/events` inside the container and posts each one as a StartOS notification |
| BLAKE2b node    | Shown instead of the two above while the chosen node publishes no RPC binding: says whether it is not installed, too old or stopped |

Events posted: a new pool on the relay (if enabled, checked every 5 minutes), you are in, join refused, someone joined, close now?, stays open, closing, sign now, sent, confirmed, cancelled.

## Backups and Restore

The `main` volume. Restoring needs the password that was in use when the backup was taken.

## Limitations and Differences

- Single-signature BIP84 wallet (`bc1q…`) on the BLAKE2b chain; spending happens only through coinjoin rounds. To spend elsewhere, import the same words into Kilowallet or another BIP84 wallet on that chain.
- Pools from 10,000 sats to 1 BTC. Each person pays the same fee share, `ceil(feeRate × (68 + 31 + 31 if change + 10.5 / 2))` sats.
- The relay connection is clearnet.

## Quick Reference for AI Consumers

```yaml
package_id: kilojoin
image: kilojoin (Dockerfile build from the kilojoin submodule)
architectures: [x86_64, aarch64]
volumes:
  main: /data
dependency_mounts:
  <chosen node>/main: /mnt/node (read-only, .cookie)
ports:
  ui: 8080
dependencies:
  - knots-blake2b (optional; running; node, sync-progress; rpc 18443)
  - bitcoind (optional; running; bitcoind, sync-progress; rpc 8332; BLAKE2b checked)
relay: wss://relay.kilombino.com
actions: [choose-node]
oneshots: [chain]
health_checks: [kilojoin (web interface), notifications]
backup: main volume
```
