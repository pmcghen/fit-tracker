"""Test for the data conversion utilities."""

import unittest

from util import value_conversions


class TestConversions(unittest.TestCase):
    """Test for the data conversion utilities."""

    def test_seconds_to_minutes(self):
        """Ensure seconds are correctly calculated and formatted to minutes and hours."""
        self.assertEqual(value_conversions.seconds_to_minutes(42), "00:42")
        self.assertEqual(value_conversions.seconds_to_minutes(60), "1:00")
        self.assertEqual(value_conversions.seconds_to_minutes(640), "10:40")
        self.assertEqual(value_conversions.seconds_to_minutes(4020), "1:07:00")
        with self.assertRaises(ZeroDivisionError):
            value_conversions.seconds_to_minutes(0)

    def test_running_speed(self):
        """
        Ensure meters per second are correctly calculated and formatted to minutes per km/mile.
        """
        self.assertEqual(value_conversions.running_speed(2.213, "mi"), "12:07")
        self.assertEqual(value_conversions.running_speed(2.213), "7:31")

    def test_cycling_speed(self):
        """Ensure meters per second are correctly calculated and formatted to kph/mph."""
        self.assertEqual(value_conversions.cycling_speed(2.213, "mi"), "4.95")
        self.assertEqual(value_conversions.cycling_speed(2.213), "7.97")

    def test_meters_to_feet(self):
        """Ensure meters are correctly calculated and formatted to feet."""
        self.assertEqual(value_conversions.meters_to_feet(100), 328)
        self.assertEqual(value_conversions.meters_to_feet(102), 335)

    def test_celsius_to_fahrenheit(self):
        """Ensure Celsius temperature correctly calculated and formatted to Fahrenheit."""
        self.assertEqual(value_conversions.celsius_to_fahrenheit(10), 50)
        self.assertEqual(value_conversions.celsius_to_fahrenheit(13), 55)
        self.assertEqual(value_conversions.celsius_to_fahrenheit(16), 61)


if __name__ == "__main__":
    unittest.main()
