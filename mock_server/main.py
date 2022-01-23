from flask import Flask, request
from flask_cors import CORS
import json 

app = Flask(__name__)
CORS(app)

@app.route('/get_json', methods=['GET'])
def read_json():
    """
        reads jsom mock database and returns it.
    """
    with open('mock_database.json', 'r') as json_file:
        mock_database = json.load(json_file)
        return mock_database,200

@app.route('/write_json', methods=['POST'])
def write_json():
    json_data_to_update = request.get_json()['json_data']
    print(json_data_to_update)
    with open('mock_database.json', 'w') as json_file:
        json.dump(json_data_to_update, json_file)
    return 'wrote incoming request to file' , 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5010)
