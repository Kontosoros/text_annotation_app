from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.data_updating import update_data

app = Flask(__name__)


CORS(app, resources={r"/receive-data": {"origins": "*"}})


@app.route("/receive-data", methods=["POST"])
def receive_data():
    data = request.json
    
    labelist = data.get("labeList")
    goldenAnnotations = data.get("goldenAnnotations")
    transformedList = data.get("transformedList")
    updated_loading_data = update_data(labelist, goldenAnnotations, transformedList)
    
    return (
        updated_loading_data
        if updated_loading_data
        else [
            {"name": "", "content": "", "entities": []},
        ]
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
