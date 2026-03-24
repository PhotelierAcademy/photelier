#!/usr/bin/env python3
import os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
directory = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.abspath(__file__))

os.chdir(directory)

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}", flush=True)

print(f"Serving {directory} at http://localhost:{port}", flush=True)
HTTPServer(("", port), Handler).serve_forever()
