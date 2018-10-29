#!/usr/bin/env python

import json, io

inputFile = io.open('/tmp/metronome-ui/events.raw', 'r')

events = []

for line in inputFile:
    data = json.loads(line)
    events.append({
        "uniqueId": data["context"]["uniqueId"],
        "name": data["name"],
        "timestamp": data["@timestamp"],
        "sessionId": data["context"]["sessionId"],
        "appId": data["context"]["appId"],
        "user": data["context"].get("user", None)
    })


outputFile = io.open('./app/src/data/events.json', 'w', encoding='utf-8')
outputFile.write(json.dumps(events, ensure_ascii=False))
