#!/usr/bin/env python3

import sys

for path in sys.argv[1:]:
    with open(path, "rb") as f:
        lines = f.readlines()
    with open(path, "wb") as f:
        for line in lines:
            body = line.rstrip(b"\r\n")
            eol = line[len(body) :]
            f.write(body.rstrip(b" \t") + eol)
