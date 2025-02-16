from garmin_fit_sdk import Decoder, Stream


def process_fit(file) -> dict:
    """
    If a FIT file is provided from the new activity form, use it to create and return a dictionary
    with the details of the activity.
    """
    stream: Stream = file
    decoder: Decoder = Decoder(stream)
    messages, errors = decoder.read()
    activity_data = {}

    if not Decoder.is_fit(stream):
        return {"error": "File provided was not in the FIT format."}

    print(errors)
    print(messages)

    return activity_data
