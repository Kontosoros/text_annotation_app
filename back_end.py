from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)


CORS(app, resources={r"/receive-data": {"origins": "*"}})


@app.route("/receive-data", methods=["POST"])
def receive_data():
    data = request.json
    labellist = data.get("labelList")
    goldenAnnotations = data.get("goldenAnnotations")
    transformedList = data.get("transformedList")
    print("labellist", labellist)
    # print("=============================")
    # print()
    # print("goldenAnnotations", goldenAnnotations)
    # print("=============================")
    # print()
    # print("transformedList", transformedList)
    return ""


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
