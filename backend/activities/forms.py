from django import forms


class UploadActivityForm(forms.Form):
    title = forms.CharField(max_length=50)
    description = forms.CharField()
    fitFile = forms.FileField()
