from flask import Flask, jsonify as json
import random
import os
import codecs


media_folder = "/home/art/src/web/files/media/"
text_file = "/home/art/src/web/files/text/phrases.txt"
media_limit = len(os.listdir(media_folder)) - 1

text_limit: int
with open(text_file, "r") as f:
    lines = [line for line in f.read().split("\n") if line.strip() != ""]
    text_limit = len(lines)

app = Flask(__name__, static_folder="../web")


@app.route("/")
def script():
    return app.send_static_file("index.html")


@app.route("/data", methods=["GET"])
def data():
    (media, text) = (set(), set())

    def get_random_file():
        return random.choice(os.listdir(media_folder))

    def broke_line(line: str):
        line: bytes = line.encode("utf-8", "ignore")
        line = line.decode("latin-1", "ignore")
        return line

    def get_random_phrase():  # почему то иногда не работает
        if random.randint(0, 1):
            return random.choice(lines)
        else:
            return broke_line(random.choice(lines))

    while len(media) <= media_limit and len(text) <= text_limit:
        media.add(get_random_file())
        text.add(get_random_phrase())
    return json({"media": list(media), "text": list(text)}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8081)
