"""Utilities to convert raw values from the FIT file into something human readable."""

# All speed conversion formulas were taken from https://www.aqua-calc.com/convert/speed/


def seconds_to_minutes(seconds: float) -> str:
    """Format seconds into (HH:)MM:SS."""

    if seconds <= 0:
        raise ZeroDivisionError

    if seconds > 59:
        hours = 0
        minutes = int(seconds / 60)
        seconds_overflow = 0

        if seconds % 60 != 0:
            seconds_overflow = str(seconds % 60)

        seconds_overflow = str(seconds_overflow).zfill(2)

        if minutes > 60:
            hours = int(minutes / 60)

        if hours > 0:
            minutes = str(minutes - 60).zfill(2)
            return f"{hours}:{minutes}:{seconds_overflow}"

        return f"{minutes}:{seconds_overflow}"

    return f"00:{int(round(seconds))}"


def running_speed(mps: float, unit: str = "km") -> str:
    """
    Takes the meters per second from the activity and converts it to either
    minutes per mile or minutes per kilometer based on the user's preferences.
    """
    MINUTES_PER_MILE = 26.8224 / mps
    MINUTES_PER_KM = 16.666666667 / mps

    pace = MINUTES_PER_KM

    if unit == "mi":
        pace = MINUTES_PER_MILE

    minutes = f"{int(pace)}"
    seconds = 0

    if pace % 60 != 0:
        fraction_of_minute = (pace % 60) % 1
        seconds = int(fraction_of_minute * 60)

    if seconds > 59:
        seconds = f"0{int(seconds / 100)}"

    seconds = str(seconds).zfill(2)

    return f"{minutes}:{seconds}"


def cycling_speed(mps: float, unit: str = "km") -> str:
    """
    Takes the meters per second from the activity and converts it to either
    miles per hour or kilometers per hour based on the user's preferences.
    """
    MILES_PER_HOUR = 2.23693629 * mps
    KM_PER_HOUR = 3.6 * mps

    pace = KM_PER_HOUR

    if unit == "mi":
        pace = MILES_PER_HOUR

    return "{:.2f}".format(pace)


def meters_to_feet(meters: float) -> int:
    """Convert meters to feet."""
    feet = meters * 3.28

    return int(round(feet, 0))


def celsius_to_fahrenheit(temp: float) -> int:
    """Convert Celcius to Fahrenheit."""
    degrees_f = temp * 1.8 + 32

    return int(round(degrees_f, 0))
