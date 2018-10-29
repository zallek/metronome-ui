#!/usr/bin/env python

import requests, os, io, json

host = os.environ.get("DATABUS_HOST", "databus-staging.tinyclues.net")
username = os.environ.get("DATABUS_USERNAME")
password = os.environ.get("DATABUS_PASSWORD")

baseApiPath = "http://" + host + ":15672/api/"

consumers = requests.request("GET", baseApiPath + "consumers", auth=(username, password))
bindings = requests.request("GET", baseApiPath + "bindings", auth=(username, password))

queuesByApp = {}
for consumer in consumers.json():
    app = consumer.get("channel_details").get("user")
    queue = consumer.get("queue").get("name")

    if app not in queuesByApp:
        queuesByApp[app] = []
    queuesByApp[app].append(queue)

eventsByQueue = {}
for binding in bindings.json():
    if binding.get("source") == "platform_event":
        queue = binding.get("destination")
        event = binding.get("routing_key")
        
        if queue not in eventsByQueue:
            eventsByQueue[queue] = []
        eventsByQueue[queue].append(event)

eventsByApp = {}
for app, queues in queuesByApp.iteritems():
    eventsByApp[app] = []
    for queue in queues:
        events = eventsByQueue.get(queue, [])
        for event in events:
            if event not in eventsByApp[app]:
                eventsByApp[app].append(event)

outputFile = io.open('./app/src/data/consumers.json', 'w', encoding='utf-8')
outputFile.write(json.dumps(eventsByApp, ensure_ascii=False))