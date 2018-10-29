pull-events:
	mkdir -p /tmp/metronome-ui
	aws s3 sync s3://databus-backup-fc1101b9bfbc4d2ac23eded20c420815/prod/ /tmp/metronome-ui/events/ --exclude "*" --include "*/2018/10/04/*"
	aws s3 sync s3://databus-backup-fc1101b9bfbc4d2ac23eded20c420815/production/ /tmp/metronome-ui/events/ --exclude "*" --include "*/2018/10/04/*"
	find /tmp/metronome-ui/events/ -name "*.txt"  -exec cat {} \; > /tmp/metronome-ui/events.raw
	python scripts/raw-events-to-json.py

pull-consumers:
	python scripts/get-event-consumers.py
