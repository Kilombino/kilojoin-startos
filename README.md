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

The knots-blake2b `main` volume is also mounted, **read-only**, at `/mnt/node`, for its RPC cookie.

## File Models

None. Kilojoin writes its own files; the package configures it through environment variables only (`KILOJOIN_DATA`, `KILOJOIN_PORT`, `BITCOIN_RPC_URL`, `BITCOIN_RPC_COOKIE`).

## Dependencies

| Dependency                          | Kind    | Health checks required    | Why                                                               |
| ----------------------------------- | ------- | ------------------------- | ----------------------------------------------------------------- |
| `knots-blake2b` (Bitcoin Knots, BLAKE2b) | running | `node`, `sync-progress`   | Wallet scan (`scantxoutset`), checking every pool input (`gettxout`), fee estimates, broadcast |

The RPC address comes from `sdk.host.getBridgeAddress` on knots-blake2b's `rpc` host, internal port 18443. Credentials are its `.cookie`, re-read on every call, so a node restart that rotates the cookie needs no Kilojoin restart. A pruned node works: nothing needs `txindex`.

## Network Access and Interfaces

| Interface | Id   | Type | Port | Description                          |
| --------- | ---- | ---- | ---- | ------------------------------------ |
| Web UI    | `ui` | ui   | 8080 | Your wallet and your coinjoin pools  |

Outbound, Kilojoin opens a WebSocket to `wss://relay.kilombino.com` (pool announcements, kind 32022, and NIP-44 encrypted round messages, kind 2023). It is the only outside connection.

## Installation and First-Run Flow

Nothing is configured from StartOS. The first visit to the Web UI asks either to **import** BIP-39 words (12 or 24, optional passphrase) or to **create** new ones (shown once), plus a password of at least 8 characters. Every later visit asks for the password; a wrong one is answered after 1.5 s. The decrypted words are kept in memory only while the page is unlocked; **Lock** forgets them. After a restart the words stay encrypted until someone unlocks, but rounds already joined keep running and the server can still vote; signing needs an unlock.

## Actions

None.

## Tasks

None.

## Health Checks

| Check           | Meaning                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------- |
| Web Interface   | Port 8080 is listening                                                                        |
| Notifications   | Every 20 s, reads new events from `http://127.0.0.1:8080/internal/events` inside the container and posts each one as a StartOS notification |
| BLAKE2b node    | Shown instead of the two above while knots-blake2b publishes no RPC binding                   |

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
  knots-blake2b/main: /mnt/node (read-only, .cookie)
ports:
  ui: 8080
dependencies:
  - knots-blake2b (running; health checks node, sync-progress)
relay: wss://relay.kilombino.com
actions: []
health_checks: [kilojoin (web interface), notifications]
backup: main volume
```
