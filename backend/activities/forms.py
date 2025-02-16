from django import forms


class UploadActivityForm(forms.Form):
    """
    The UploadActivity form allows users to create a new Activity from a FIT file. Users may
    specify a title and description for the activity in addition to providing the FIT file.
    """

    title = forms.CharField(max_length=50)
    description = forms.CharField()
    fitFile = forms.FileField()
