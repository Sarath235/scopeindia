from django.db import models
# Create your models here.
class Registration(models.Model):
    Full_Name=models.CharField(max_length=200)
    Date_of_Birth=models.DateField()
    Gender_choices=[('M', 'Male'),('F' , 'Female'),('O', 'Other')]
    Gender=models.CharField(max_length=50,choices=Gender_choices)
    Education=models.CharField(max_length=50)
    Mobile_num=models.CharField(max_length=50)
    Email=models.EmailField()
    Guardians_name=models.CharField(max_length=50)
    Guardians_occupation=models.CharField(max_length=50)
    Guardians_number=models.CharField(max_length=50)
    course_choices=[('PF','Python FullStack'),('DM','Digital Marketing'),('MS', 'Mern Stack')]
    Course=models.CharField(max_length=50,choices=course_choices)
    Training_choices=[('online' ,'Online'),('offline','Offline')]
    Training=models.CharField(max_length=50,choices=Training_choices)
    Scope_location=models.CharField(max_length=50)
    Preferred_timing=models.CharField(max_length=50)
    Address=models.TextField()
    Country=models.CharField(max_length=50)
    State=models.CharField(max_length=50)
    city=models.CharField(max_length=50)
    pincode=models.CharField(max_length=50)
    def __str__(self):
        return self.Full_Name
    
