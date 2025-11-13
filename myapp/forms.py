from django import forms
from .models import Registration
class RegistrationForm(forms.ModelForm):
    class Meta:
        model=Registration
        fields="__all__"
        widgets={
            'Full_Name':forms.TextInput(attrs={'class':'form-control','placeholder':'entrt your name'}),
            'Date_of_Birth':forms.DateInput(attrs={'class':'form-control','type':'date'}),
            'Gender':forms.Select(attrs={'class':'form-control'}),
            'Education  ':forms.Select(attrs={'class':'form-control'}),
            'Training ':forms.Select(attrs={'class':'form-control'}),
            'Training ':forms.Select(attrs={'class':'form-control'}),
        }