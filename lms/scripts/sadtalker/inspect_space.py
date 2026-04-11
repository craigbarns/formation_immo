#!/usr/bin/env python3
"""Affiche l’API Gradio d’un Space SadTalker (pour coder generate_example.py).

  cd lms/scripts && python3 -m venv .venv-sadtalker && source .venv-sadtalker/bin/activate
  pip install -r sadtalker/requirements.txt
  export HF_TOKEN=hf_xxx   # souvent requis
  python sadtalker/inspect_space.py
"""

from __future__ import annotations

import os
import sys


def main() -> int:
    try:
        from gradio_client import Client
    except ImportError:
        print("pip install -r sadtalker/requirements.txt", file=sys.stderr)
        return 1

    space = os.environ.get("SADTALKER_SPACE", "vinthony/SadTalker")
    token = os.environ.get("HF_TOKEN")

    print(f"Space: {space}\n")
    try:
        client = Client(space, token=token)
    except Exception as e:
        print(f"Erreur de connexion : {e}", file=sys.stderr)
        print(
            "\nAstuces : dupliquez le Space sur votre compte HF, ou choisissez un fork public.\n"
            "Token : https://huggingface.co/settings/tokens",
            file=sys.stderr,
        )
        return 1

    print(client.view_api())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
