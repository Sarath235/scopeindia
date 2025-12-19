
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.core.mail import send_mail
from .models import *
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login,logout
from django.contrib.auth import update_session_auth_hash, logout
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from .models import Profile

def index(request):
    return render(request,'index.html')

def aboutus(request):
    return render(request,'aboutus.html')

def contactus(request):
    return render(request,'contactus.html')

def scopelogin(request):
    saved_email = request.COOKIES.get('remember_me', '')

    if request.method == 'POST':
        email = request.POST.get('email').strip().lower()
        password = request.POST.get('password')
        temp_password = request.POST.get('temp_password')
        remember_me = request.POST.get('remember_me')

        user = User.objects.filter(email=email).first()
        if not user:
            messages.error(request, "Email not registered")
            return redirect('scopelogin')

        profile = user.profile

        # ✅ FIX 6: Temporary password login
        if temp_password:
            if profile.temp_password and str(profile.temp_password) == str(temp_password):
                request.session['reset_user'] = user.id
                return redirect('createpassword')
            else:
                messages.error(request, 'Invalid temporary password')
                return redirect('scopelogin')

        # ✅ FIX 7: Normal login
        user = authenticate(request, username=email, password=password)
        if user:
            login(request, user)
            response = redirect('dashboard')

            if remember_me:
                response.set_cookie('remember_me', email, max_age=7 * 24 * 60 * 60)
            else:
                response.delete_cookie('remember_me')

            return response

        messages.error(request, 'Invalid credentials')
        return redirect('scopelogin')

    return render(request, "scopelogin.html", {"saved_email": saved_email})


def firstlogin(request):
    if request.method == 'POST':
        email = request.POST.get('email').strip().lower()

        # ✅ FIX 1: Create user if not exists
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'username': email}
        )

        # ✅ FIX 2: Set unusable password for first-time user
        if created:
            user.set_unusable_password()
            user.save()

        # ✅ FIX 3: Ensure profile exists
        profile, _ = Profile.objects.get_or_create(user=user)

       

        # ✅ FIX 5: Generate temporary password
        temp_pass = str(uuid.uuid4())[:8]
        profile.temp_password = temp_pass
        profile.save()

        send_mail(
            subject="Temporary Password",
            message=f"Your temporary password is: {temp_pass}",
            from_email="djangojango100@gmail.com",
            recipient_list=[email],
            fail_silently=False
        )

        messages.success(request, 'Temporary password sent to your email')
        return redirect('scopelogin')

    return render(request, 'firstlogin.html')


def createpassword(request):
    user_id = request.session.get('reset_user')
    if not user_id:
        return redirect('scopelogin')

    user = User.objects.get(id=user_id)

    if request.method == 'POST':
        p1 = request.POST.get('password1')
        p2 = request.POST.get('password2')

        if p1 != p2:
            messages.error(request, 'Passwords must match')
            return redirect('createpassword')

        user.set_password(p1)
        user.save()

        user.profile.temp_password = None
        user.profile.save()

        del request.session['reset_user']

        messages.success(request, 'Password created successfully. Please login.')
        return redirect('scopelogin')

    return render(request, 'createpassword.html')


def resetpass(request):
    return render(request,'resetpass.html')

def register(request):
    if request.method == 'POST':

        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        dob = request.POST.get('dob')
        gender = request.POST.get('gender')
        phone = request.POST.get('mobile')
        email = request.POST.get('email').lower()  # normalize email
        country = request.POST.get('country')
        state = request.POST.get('state')
        city = request.POST.get('city')
        hobbies = request.POST.getlist('hobbies') 
        avatar = request.FILES.get('avatar')

        # Check if user exists
        existing_user = User.objects.filter(email=email).first()
        if existing_user:
            # If existing user is unverified, delete to allow re-registration
            if hasattr(existing_user, 'profile') and not existing_user.profile.email_verified:
                existing_user.delete()
            else:
                messages.error(request, 'Email already registered')
                return redirect('register')

        # Create new user
        user = User.objects.create(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_unusable_password()
        user.save()

        # Create profile with email verification token
        profile = Profile.objects.create(
            user=user,
            gender=gender,
            dob=dob,
            phone=phone,
            country=country,
            state=state,
            city=city,
            hobbies=", ".join(hobbies),
            avatar=avatar,
            email_token=uuid.uuid4(),  # make sure Profile model has email_token field
        )

        # Send verification email
        verify_link = f"http://127.0.0.1:8000/myapp/verify/{profile.email_token}/"
        send_mail(
            subject="Your Email verification link",
            message=f"Click to verify your email: {verify_link}",
            from_email="djangojango100@gmail.com",
            recipient_list=[email],
        )

        messages.success(request, "Registration successful! Please verify your email.")
        return redirect('scopelogin')  # send user to login page

    return render(request, 'register.html')
def verify(request,token):
    profile=Profile.objects.filter(email_token=token).first()
    if profile:
        profile.email_verified=True
        profile.save()
        messages.success(request,"email verified successfully")
    else:
        messages.error(request,"invalid verification link")
        
    return redirect('scopelogin')


@login_required
def dashboard(request):
    
    query=request.GET.get('search')
    active_tab = "search" if query else "home"
    if query:
        courses=Course.objects.filter(name__icontains=query)
        
    else:
        courses=Course.objects.all()
    my_courses=Student_courses.objects.filter(student=request.user)
    context={
        'courses':courses,
        'my_courses':my_courses,
        'query':query,
        'active_tab':active_tab
    }
    return render(request,'dashboard.html',context)
@login_required
def signedup_course(request,course_id):
    course=Course.objects.filter(id=course_id).first()
    if not course:
        messages.error(request,'no course found')
        return redirect('dashboard')
    exists=Student_courses.objects.filter(student=request.user,course=course).first()
    if exists:
        messages.error(request,'you have already chosen that course')
        return redirect('dashboard')
    Student_courses.objects.create(
        student=request.user,
        course=course
    )
    messages.success(request,'you have signed up for this course')
    return redirect('dashboard')

@login_required
def edit_profile(request):
    profile = request.user.profile
    user = request.user 

    if request.method == "POST":

        user.first_name = request.POST.get("first_name")
        user.last_name = request.POST.get("last_name")
        user.save()

        profile.phone = request.POST.get("phone")
        profile.city = request.POST.get("city")
        profile.state = request.POST.get("state")
        profile.country = request.POST.get("country")
        profile.hobbies = request.POST.get("hobbies")


        if request.FILES.get("avatar"):
            profile.avatar = request.FILES.get("avatar")

        profile.save()

        messages.success(request, "Profile updated successfully")
        return redirect("dashboard")


@login_required
def change_password(request):

    if request.method=='POST':
        old=request.POST.get('old_password')
        new=request.POST.get('new_password')

        if not request.user.check_password(old):
            messages.error(request,'incorrect old password')
            return redirect('change_password')
        request.user.set_password(new)
        request.user.save()

        logout(request)
        messages.success(request,'passwordword changed successfully please login again')
        return redirect('scopelogin')
    
@login_required
def remove_course(request,course_id):
    course=Course.objects.filter(id=course_id).first()
    Student_courses.objects.filter(
             student=request.user,
             course=course
    ).delete()
    messages.success(request,'you have withdrawn fromthe course')
    return redirect('dashboard')
def logout_user(request):
    logout(request)
    response=redirect('scopelogin')
    response.delete_cookie('remember_me')
    return response
@login_required
def dashboard(request):
    query = request.GET.get('search')
    active_tab = "search" if query else "home"

    if query:
        courses = Course.objects.filter(name__icontains=query)
    else:
        courses = Course.objects.all()

    my_courses = Student_courses.objects.filter(student=request.user)

    # Fetch user profile
    profile = getattr(request.user, 'profile', None)

    context = {
        'courses': courses,
        'my_courses': my_courses,
        'query': query,
        'active_tab': active_tab,
        'profile': profile,  # Pass profile to template
    }
    return render(request, 'dashboard.html', context)

@login_required
def signedup_course(request,course_id):
    course=Course.objects.filter(id=course_id).first()
    if not course:
        messages.error(request,'no course found')
        return redirect('dashboard')
    exists=Student_courses.objects.filter(student=request.user,course=course).first()
    if exists:
        messages.error(request,'you have already chosen that course')
        return redirect('dashboard')
    Student_courses.objects.create(
        student=request.user,
        course=course
    )
    messages.success(request,'you have signed up for this course')
    return redirect('dashboard')

@login_required
def edit_profile(request):
    profile = request.user.profile
    user = request.user 

    if request.method == "POST":

        user.first_name = request.POST.get("first_name")
        user.last_name = request.POST.get("last_name")
        user.save()

        profile.phone = request.POST.get("phone")
        profile.city = request.POST.get("city")
        profile.state = request.POST.get("state")
        profile.country = request.POST.get("country")
        profile.hobbies = request.POST.get("hobbies")


        if request.FILES.get("avatar"):
            profile.avatar = request.FILES.get("avatar")

        profile.save()

        messages.success(request, "Profile updated successfully")
        return redirect("dashboard")


@login_required
def change_password(request):

    if request.method=='POST':
        old=request.POST.get('old_password')
        new=request.POST.get('new_password')

        if not request.user.check_password(old):
            messages.error(request,'incorrect old password')
            return redirect('change_password')
        request.user.set_password(new)
        request.user.save()

        logout(request)
        messages.success(request,'passwordword changed successfully please login again')
        return redirect('scopelogin')
    
@login_required
def remove_course(request,course_id):
    course=Course.objects.filter(id=course_id).first()
    Student_courses.objects.filter(
             student=request.user,
             course=course
    ).delete()
    messages.success(request,'you have withdrawn fromthe course')
    return redirect('dashboard')
def logout_user(request):
    logout(request)
    response=redirect('scopelogin')
    response.delete_cookie('remember_me')
    return response



def forgotpassword(request):
    if request.method == 'POST':
        email = request.POST.get('email').strip().lower()
        user = User.objects.filter(email=email).first()

        if not user:
            messages.error(request, 'Email not registered')
            return redirect('forgotpassword')

        temp_password = str(uuid.uuid4())[:8]
        user.profile.temp_password = temp_password
        user.profile.save()

        send_mail(
            subject='Your Temporary Password',
            message=f"Your OTP is {temp_password}",
            from_email='djangojango100@gmail.com',
            recipient_list=[email],
        )

        messages.success(request, 'Temporary password sent to your email')
        return redirect('scopelogin')

    return render(request, 'forgotpassword.html')
