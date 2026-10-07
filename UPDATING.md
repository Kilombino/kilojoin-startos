# Updating

Upstream is the `kilojoin` git submodule (github.com/Kilombino/kilojoin), which itself pins the `kilowallet` submodule whose coinjoin and crypto code it compiles.

To bump:

1. `git -C kilojoin fetch && git -C kilojoin checkout <tag>` and `git -C kilojoin submodule update --init`.
2. Edit `version` and `releaseNotes` in `startos/versions/current.ts`.
3. `make`.
