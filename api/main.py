"""Reads a FIT file and outputs its details"""

import sys
from garmin_fit_sdk import Decoder, Stream

stream: Stream = Stream.from_file(
    "/home/pat/Projects/python/fit-tracker/test-data/Zwift_Chasing_the_Sun_in_Makuri_Islands.fit"
)
decoder = Decoder(stream)
messages, errors = decoder.read()

for mk, mv in messages.items():
    print(mk)

if not messages["file_id_mesgs"][0]["type"] == "activity":
    print("Only activity files can be processed!")
    sys.exit(0)

manufacturer = messages["file_id_mesgs"][0]["manufacturer"]

if manufacturer == "wahoo_fitness":
    pass
elif manufacturer == "coros":
    pass


def print_dict_details(details: dict, key: str) -> None:
    """
    Accepts a key from a dictionary and prints that key's value to the console.
    """
    print(key)
    msg_count = len(details[key])

    for msg in range(msg_count):
        msg_body = details[key][msg]
        print("---")

        for inner_key, inner_value in msg_body.items():
            print(inner_key + ":", inner_value)

    print("=*=*=*=*=*=*=*=*=*=*\n")


def print_session_overview(session: dict) -> None:
    """Format and print session overview"""
    print(session)


print_dict_details(messages, "device_info_mesgs")
print_dict_details(messages, "session_mesgs")
print_dict_details(messages, "activity_mesgs")
