from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from .forms import RegistrationForm
# Create your views here.
from django.http import HttpResponse

def index(request):
    return render(request,'index.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    return render(request,'contact.html')   

def register(request):
    if request.method == 'POST':
        form=RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse("Registration Successful")
    else:
        form=RegistrationForm()
    return render(request,'register.html',{'form':form})
