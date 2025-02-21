from garmin_fit_sdk import Decoder, Stream


def process_fit(fit_file) -> dict:
    """
    If a FIT file is provided from the new activity form, use it to create and return a dictionary
    with the details of the activity.
    """
    file = fit_file.path

    stream: Stream = Stream.from_file(file)
    decoder: Decoder = Decoder(stream)
    messages, errors = decoder.read()
    supported_sports = ["running", "cycling", "hiking"]

    # TODO: Properly implement `is_fit` check.
    # if not decoder.is_fit():
    #     return {"error": "File provided was not in the FIT format."}

    if not messages["file_id_mesgs"][0]["type"] == "activity":
        return {"error": "Only activity files can be processed."}

    activity_data = {}

    for mk, mv in messages.items():
        if mk == "device_info_mesgs":
            for mv_item in range(len(mv)):
                item = mv[mv_item]

                if "manufacturer" in item:
                    activity_data["manufacturer"] = item["manufacturer"]
                if "product_name" in item:
                    activity_data["product_name"] = item["product_name"]

        if mk == "session_mesgs":
            for mv_item in range(len(mv)):
                item = mv[mv_item]

                if item["sport"] in supported_sports:
                    activity_data["sport"] = item["sport"]
                else:
                    return {"error": "Unsupported sport"}

                if "sub_sport" in item:
                    activity_data["sub_sport"] = item["sub_sport"]
                if "timestamp" in item:
                    activity_data["timestamp"] = item["timestamp"]
                if "start_time" in item:
                    activity_data["start_time"] = item["start_time"]
                if "total_elapsed_time" in item:
                    activity_data["total_elapsed_time"] = item["total_elapsed_time"]
                if "total_moving_time" in item:
                    activity_data["total_moving_time"] = item["total_moving_time"]
                if "total_distance" in item:
                    activity_data["total_distance"] = item["total_distance"]
                if "total_calories" in item:
                    activity_data["total_calories"] = item["total_calories"]
                if "num_laps" in item:
                    activity_data["num_laps"] = item["num_laps"]
                if "avg_speed" in item:
                    activity_data["avg_speed"] = item["avg_speed"]
                if "max_speed" in item:
                    activity_data["max_speed"] = item["max_speed"]
                if "avg_power" in item:
                    activity_data["avg_power"] = item["avg_power"]
                if "max_power" in item:
                    activity_data["max_power"] = item["max_power"]
                if "avg_heart_rate" in item:
                    activity_data["avg_heart_rate"] = item["avg_heart_rate"]
                if "min_heart_rate" in item:
                    activity_data["min_heart_rate"] = item["min_heart_rate"]
                if "max_heart_rate" in item:
                    activity_data["max_heart_rate"] = item["max_heart_rate"]
                if "avg_cadence" in item:
                    activity_data["avg_cadence"] = item["avg_cadence"]
                if "max_cadence" in item:
                    activity_data["max_cadence"] = item["max_cadence"]
                if "avg_running_cadence" in item:
                    activity_data["avg_running_cadence"] = item["avg_running_cadence"]
                if "max_running_cadence" in item:
                    activity_data["max_running_cadence"] = item["max_running_cadence"]
                if "avg_step_length" in item:
                    activity_data["avg_step_length"] = item["avg_step_length"]
                if "total_ascent" in item:
                    activity_data["total_ascent"] = item["total_ascent"]
                if "total_descent" in item:
                    activity_data["total_descent"] = item["total_descent"]

    if errors:
        return {"error": errors}

    return activity_data
